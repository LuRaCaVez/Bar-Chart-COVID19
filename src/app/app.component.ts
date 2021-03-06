import { Component } from '@angular/core';
import { interpolateNumber, format, axisTop, easeLinear, utcFormat, select } from 'd3';
import { rollup, ascending, descending, pairs, groups, range } from 'd3-array';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo-Bar-Chart-Race';
  dataUrl;
  duration = 110;
  n = 17;
  k = 2;
  margin = {top: 30, right: 6, bottom: 3, left: 100};
  barSize = 38;
  names;
  datevalues;
  keyframes: Array<any>;
  nameframes;
  color;
  height;
  width = window.screen.width;
  x;
  y;
  prev;
  next;

  startProvincia(){
    this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
    select("svg").remove();
    this.renderGraph();
  }

  startRegione(){
    this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
    select("svg").remove();
    this.renderGraph();
  }

  cleanData(response) {
    let data = response.data.map(d=>new Object({
      'date': d.data.trim().replace(" ", "T").split("T")[0],
      'name': this.dataUrl.includes("province") ? d.denominazione_provincia : d.denominazione_regione,
      'value': d.totale_casi
    }));
    return data.filter(d=>d.date > '2020-02-24' && d.name != 'In fase di definizione/aggiornamento')
  }

  renderGraph(){
    axios.get(this.dataUrl).then((response) => {

      let data: Array<any> = this.cleanData(response);
        
      this.names = new Set(data.map(d => d.name));
  
      this.datevalues = Array.from(rollup(data, ([d]) => +d.value || 0.001, d => d.date, d => d.name))
                        .map(([date, data]) => [new Date(date), data])
                        .sort(([a], [b]) => ascending(a[0], b[0]));

      this.keyframes = [];
      let ka, a, kb, b;
      for ([[ka, a], [kb, b]] of pairs<Array<any>>(this.datevalues)) {
        for (let i = 0; i < this.k; ++i) {
          const t = i / this.k;
          this.keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
          ]);
        }
      }
      this.keyframes.push([new Date(kb), this.rank(name => +b.get(name) || 0)]);

      this.nameframes = groups(this.keyframes.flatMap(([, data]) => data), d => d.name)

      this.prev = new Map(this.nameframes.flatMap(([, data]) => pairs(data, (a, b) => [b, a])))

      this.next = new Map(this.nameframes.flatMap(([, data]) => pairs(data)))

      const scale = scaleOrdinal(schemeTableau10);
      if (data.some(d => d.category !== undefined)) {
        const categoryByName = new Map(data.map(d => [d.name, d.category]))
        scale.domain(Array.from(categoryByName.values()));
        this.color = d => scale(categoryByName.get(d.name));
      } else {
        this.color =  d => scale(d.name);
      }

      this.height = this.margin.top + this.barSize * this.n + this.margin.bottom;

      this.x = scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right]);
 
      this.y = scaleBand()
              .domain(range(this.n + 1).map(m=>m.toString()))
              .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
              .padding(0.1)

      this.chart();
  
    }).catch((err) => {
      console.log(err);
    });
  }

  async chart (){
    const svg = select("div#chart").append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);
  
    const updateBars = this.bars(svg);
    const updateAxis = this.axis(svg);
    const updateLabels = this.labels(svg);
    const updateTicker = this.ticker(svg);

    for (const keyframe of this.keyframes) {
      const transition = svg.transition()
          .duration(this.duration)
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

  rank(value) {
    const data = Array.from(this.names, name => ({name, value: value(name)}));
    data.sort((a, b) => descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i]['rank'] = Math.min(this.n, i);
    return data;
  }

  bars(svg) {
    let bar = svg.append("g")
        .attr("fill-opacity", 0.6)
        .selectAll("rect");
  
    return ([date, data], transition) => bar = bar
      .data(data.slice(0, this.n), d => d.name)
      .join(
        enter => enter.append("rect")
          .attr("fill", this.color)
          .attr("height", this.y.bandwidth())
          .attr("x", this.x(0))
          .attr("y", d => this.y((this.prev.get(d) || d).rank))
          .attr("width", d => this.x((this.prev.get(d) || d).value) - this.x(0)),
        update => update,
        exit => exit.transition(transition).remove()
          .attr("y", d => this.y((this.next.get(d) || d).rank))
          .attr("width", d => this.x((this.next.get(d) || d).value) - this.x(0))
      )
      .call(bar => bar.transition(transition)
        .attr("y", d => this.y(d.rank))
        .attr("width", d => this.x(d.value) - this.x(0)));
  }

  labels(svg) {
    let label = svg.append("g")
        .style("font", "bold 14px var(--sans-serif)")
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
      .selectAll("text");
  
    return ([date, data], transition) => label = label
      .data(data.slice(0, this.n), d => d.name)
      .join(
        enter => enter.append("text")
          .attr("transform", d => `translate(${this.x((this.prev.get(d) || d).value)},${this.y((this.prev.get(d) || d).rank)})`)
          .attr("y", this.y.bandwidth() / 2)
          .attr("x", -6)
          .attr("dy", "-0.25em")
          .text(d => d.name)
          .call(text => text.append("tspan")
            .attr("fill-opacity", 0.7)
            .attr("font-weight", "normal")
            .attr("x", -6)
            .attr("dy", "1.15em")),
        update => update,
        exit => exit.transition(transition).remove()
          .attr("transform", d => `translate(${this.x((this.next.get(d) || d).value)},${this.y((this.next.get(d) || d).rank)})`)
          .call(g => g.select("tspan").tween("text", d => this.textTween(d.value, (this.next.get(d) || d).value)))
      )
      .call(bar => bar.transition(transition)
        .attr("transform", d => `translate(${this.x(d.value)},${this.y(d.rank)})`)
        .call(g => g.select("tspan").tween("text", d => this.textTween((this.prev.get(d) || d).value, d.value))));
  }

  textTween(a, b) {
    const i = interpolateNumber(a, b);
    return function(t) {
      this.textContent = format(",d")(i(t));
    };
  }

  axis(svg) {
    const g = svg.append("g")
        .attr("transform", `translate(0,${this.margin.top})`);
  
    const axis = axisTop(this.x)
        .ticks(this.width / 160)
        .tickSizeOuter(0)
        .tickSizeInner(-this.barSize * (this.n + this.y.padding()));
  
    return (_, transition) => {
      g.transition(transition).call(axis);
      g.select(".tick:first-of-type text").remove();
      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
      g.select(".domain").remove();
    };
  }

  ticker(svg) {
    const now = svg.append("text")
        
        .attr("font-size", "30px")
        .attr("text-anchor", "end")
        .attr("x", this.width)
        .attr("y", this.margin.top + this.barSize * (this.n - 0.45))
        
        .text(utcFormat("%d/%m/%Y")(this.keyframes[0][0]));
  
    return ([date], transition) => {
      transition.end().then(() => now.text(utcFormat("%d/%m/%Y")(date)));
    };
  }
}
