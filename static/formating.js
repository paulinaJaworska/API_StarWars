function formatPopulation(population) {
    if (population !== 'unknown') {
        return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' people';
    } else {
        return 'unknown'
    }
}

let formatDiameter = function (diameter) {
    if (diameter !== 'unknown') {
        return diameter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' km'
    } else {
        return 'unknown'
    }
}

function formatSurfaceWaterPercentage(waterSurface) {
    if (waterSurface !== 'unknown') {
        return waterSurface + '%'
    } else {
        return 'unknown'
    }
}




/* '<tr><th>Name</th><th>Diameter</th><th>Climate</th><th>Terrain</th><th>Surface Water Percentage</th><th>Population</th><th>Residents</th></tr>';
            for (let i in planets) {
                output += '<tr><td>' + planets[i].name +
                    '</td><td>' + formatDiamter(planets[i].diameter) +
                    '</td><td>' + planets[i].climate + '</td><td>' +
                    planets[i].terrain + '</td><td>' +
                    formatSurfaceWaterPercentage(planets[i].surface_water) + '</td class="population"><td>' +
                    formatPopulation(planets[i].population) +
                    '</td><td>';
                if (planets[i].residents.length === 0) {
                    output += 'No known residents'
                } else {
                    let residentsNumber = String(planets[i].residents.length);
                    output += `<button id="btn-residents" class="btn btn-info">${residentsNumber} residents(s)</button>`
                }
                output += '</td>'
            }