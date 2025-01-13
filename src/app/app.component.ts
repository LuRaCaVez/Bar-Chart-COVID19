import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interpolateNumber, format, axisTop, easeLinear, utcFormat, select } from 'd3';
import { rollup, ascending, descending, pairs, groups, range } from 'd3-array';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import axios from 'axios';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bar-Chart-COVID19';
  dataUrl = '';
  duration = 110;
  velocity = 1;
  n = 17;
  k = 2;
  margin = {top: 30, right: 6, bottom: 3, left: 100};
  barSize = 38;
  names = new Set();
  datevalues = new Array<any>;
  keyframes = new Array<any>;
  nameframes = new Array<any>;
  color: any;
  height = 0;
  width = window.screen.width;
  x: any;
  y: any;
  prev: any;
  next: any;

  startProvincia(){
    this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
    this.renderGraph();
  }

  startRegione(){
    this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
    this.renderGraph();
  }

  cleanData(response: any){
    let data = response.data.map((d: any)=>new Object({
      'date': d.data.trim().replace(" ", "T").split("T")[0],
      'name': this.dataUrl.includes("province") ? d.denominazione_provincia : d.denominazione_regione,
      'value': d.totale_casi
    }));
    return data.filter((d: any)=>d.date > '2020-02-24' && d.name != 'In fase di definizione/aggiornamento')
  }

  renderGraph(){
    select("svg").remove();
    axios.get(this.dataUrl).then(async (response: any) => {

      let data = this.cleanData(response);
        
      this.names = new Set(data.map((d: any) => d.name));
  
      this.datevalues = Array.from(rollup(data, ([d]: any) => +d.value || 0.001, (d: any) => d.date, (d: any) => d.name))
                        .map(([date, data]) => [new Date(date), data])
                        .sort((a: any, b: any) => ascending(a[0], b[0]));

      this.keyframes = [];
      let ka, a: any, kb, b: any;
      for ([[ka, a], [kb, b]] of pairs<Array<any>>(this.datevalues)) {
        for (let i = 0; i < this.k; ++i) {
          const t = i / this.k;
          this.keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            this.rank((name: any) => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
          ]);
        }
      }
      this.keyframes.push([new Date(kb), this.rank((name: any) => +b.get(name) || 0)]);

      this.nameframes = groups(this.keyframes.flatMap(([, data]) => data), d => d.name)

      this.prev = new Map(this.nameframes.flatMap(([, data]) => pairs(data, (a, b) => [b, a])))

      this.next = new Map(this.nameframes.flatMap(([, data]) => pairs(data)))

      const scale = scaleOrdinal(schemeTableau10);
      if (data.some((d: any) => d.category !== undefined)) {
        const categoryByName = new Map<string, string>(data.map((d: any) => [d.name, d.category]))
        scale.domain(Array.from(categoryByName.values()));
        this.color = (d: any) => scale(categoryByName.get(d.name) ?? '');
      } else {
        this.color = (d: any) => scale(d.name);
      }

      this.height = this.margin.top + this.barSize * this.n + this.margin.bottom;

      this.x = scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right]);
 
      this.y = scaleBand()
              .domain(range(this.n + 1).map(m=>m.toString()))
              .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
              .padding(0.1)

      window.scrollTo(0, document.body.scrollHeight);
      
      await this.chart();
  
    }).catch((err: any) => {
      console.log(err);
    });
  }

  async chart (){
    const svg = select("div#chart").append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);
  
    const updateBars = this.bars(svg);
    const updateAxis = this.axis(svg);
    const updateLabels = this.labels(svg);
    const updateTicker = this.ticker(svg);

    let kcount = 0;
    for (const keyframe of this.keyframes) {
      kcount++;
      if (kcount % Math.max(1, this.velocity) != 0){
        continue;
      }
      const transition = svg.transition()
          .duration(Math.max(1, Math.min(this.duration, 250)))
          .ease(easeLinear);

      // Extract the top bar’s value.
      this.x.domain([0, keyframe[1][0].value]);

      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);

      await transition.end();
    }
  }

  rank(value: any) {
    const data = Array.from(this.names, name => ({name, value: value(name), rank: '0'}));
    data.sort((a, b) => descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i).toString();
    return data;
  }

  bars(svg: any) {
    let bar = svg.append("g")
        .attr("fill-opacity", 0.6)
        .selectAll("rect");
  
    return ([date, data]: Array<any>, transition: any) => bar = bar
      .data(data.slice(0, this.n), (d: any) => d.name)
      .join(
        (enter: any) => enter.append("rect")
          .attr("fill", this.color)
          .attr("height", this.y.bandwidth())
          .attr("x", this.x(0))
          .attr("y", (d: any) => this.y((this.prev.get(d) || d).rank))
          .attr("width", (d: any) => this.x((this.prev.get(d) || d).value) - this.x(0)),
        (update: any) => update,
        (exit: any) => exit.transition(transition).remove()
          .attr("y", (d: any) => this.y((this.next.get(d) || d).rank))
          .attr("width", (d: any) => this.x((this.next.get(d) || d).value) - this.x(0))
      )
      .call((bar: any) => bar.transition(transition)
        .attr("y", (d: any) => this.y(d.rank))
        .attr("width", (d: any) => this.x(d.value) - this.x(0)));
  }

  labels(svg: any) {
    let label = svg.append("g")
        .style("font", "bold 14px var(--sans-serif)")
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
      .selectAll("text");
  
    return ([date, data]: Array<any>, transition: any) => label = label
      .data(data.slice(0, this.n), (d: any) => d.name)
      .join(
        (enter: any) => enter.append("text")
          .attr("transform", (d: any) => `translate(${this.x((this.prev.get(d) || d).value)},${this.y((this.prev.get(d) || d).rank)})`)
          .attr("y", this.y.bandwidth() / 2)
          .attr("x", -6)
          .attr("dy", "-0.25em")
          .text((d: any) => d.name)
          .call((text: any) => text.append("tspan")
            .attr("fill-opacity", 0.7)
            .attr("font-weight", "normal")
            .attr("x", -6)
            .attr("dy", "1.15em")),
        (update: any) => update,
        (exit: any) => exit.transition(transition).remove()
          .attr("transform", (d: any) => `translate(${this.x((this.next.get(d) || d).value)},${this.y((this.next.get(d) || d).rank)})`)
          .call((g: any) => g.select("tspan").tween("text", (d: any) => this.textTween(d.value, (this.next.get(d) || d).value)))
      )
      .call((bar: any) => bar.transition(transition)
        .attr("transform", (d: any) => `translate(${this.x(d.value)},${this.y(d.rank)})`)
        .call((g: any) => g.select("tspan").tween("text", (d: any) => this.textTween((this.prev.get(d) || d).value, d.value))));
  }

  textTween(a: any, b: any) {
    const i = interpolateNumber(a, b);
    return function(this: any, t: any) {
      this.textContent = format(",d")(i(t));
    };
  }

  axis(svg: any) {
    const g = svg.append("g")
        .attr("transform", `translate(0,${this.margin.top})`);
  
    const axis = axisTop(this.x)
        .ticks(this.width / 160)
        .tickSizeOuter(0)
        .tickSizeInner(-this.barSize * (this.n + this.y.padding()));
  
    return (_: any, transition: any) => {
      g.transition(transition).call(axis);
      g.select(".tick:first-of-type text").remove();
      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
      g.select(".domain").remove();
    };
  }

  ticker(svg: any) {
    const now = svg.append("text")
        .attr("font-size", "30px")
        .attr("text-anchor", "end")
        .attr("x", this.width)
        .attr("y", this.margin.top + this.barSize * (this.n - 0.45))
        .text(utcFormat("%d/%m/%Y")(this.keyframes[0][0]));
  
    return ([date]: Array<any>, transition: any) => {
      transition.end().then(() => now.text(utcFormat("%d/%m/%Y")(date)));
    };
  }
}

