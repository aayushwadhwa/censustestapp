const Chart = require('chart.js');
const $ = require('jquery');

module.exports = class Visualize {
    constructor(parentId, attributes, data) {
        this.parentDivId = attributes.id + "div"
        $("#" + parentId).append(
            $(document.createElement('div')).attr({id: this.parentDivId, class: "parent-div"})
        )
        this.element = this.createCanvas(this.parentDivId, attributes.id)
        this.chart = null
    }

    createCanvas(parentId, id) {
        $("#" + parentId).append(
            $(document.createElement('canvas')).attr({ id: id, height: "400" })
        )
        $("#" + parentId).append(
            $(document.createElement('p')).attr({ id: "loading"}).html("Please wait...").hide()
        )
        return $('#' + id)[0]
    }
    
    createChart(data) {
        this.loading(false);
        if (this.chart == null) {
        this.chart = new Chart(this.element, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Income',
                    data: data.data,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 205, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(201, 203, 207, 0.5)'
                      ],
                }]
            },
            options: {
                plugins:{   
                    legend: {
                      display: false
                            },
                        }
            }
        })
    } else {
        this.chart.data.labels = data.labels;
        this.chart.data.datasets[0].data = data.data;
        this.chart.update();
    }
    }

    loading(isLoading) {
        if (isLoading) {
            this.element.style.display = "none";
            $("#loading")[0].style.display = "";
        } else {
            this.element.style.display = "";
            $("#loading")[0].style.display = "none"
        }
    }
}