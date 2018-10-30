
queue() 


        .defer(d3.json, "static/data/shark-attacks.json")
        .await(makeGraphs);
        
        function makeGraphs(error, sharkattackdData) {
        var ndx = crossfilter(sharkattackdData);

        /*------css-chartA-------*/  
        
            var name_dim = ndx.dimension(dc.pluck('Country'));
            var casulaties = name_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));
    
            dc.barChart("#shark-attacks-chart-country")
            
            .width(1700)
            .height(600)
            .margins({top: 0, right: 100, bottom: 150, left: 100})
            .mouseZoomable(true)
            .dimension(name_dim)
            .group(casulaties)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("")
            .yAxis().ticks(5);
   
        /*------css-chartB-------*/  
        
            var state_dim = ndx.dimension(dc.pluck('World Region'));
            var casulaties_attacks_region = state_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));

            dc.pieChart('#pie-chart')
            
            .transitionDuration(1000)
            .dimension(name_dim)
            .group(casulaties)
            .height(300)
            .radius(600)
            .transitionDuration(1500)
            .dimension(state_dim)
            .group(casulaties_attacks_region);    
  
        /*------css-chartC-------*/ 

        var name_dim = ndx.dimension(dc.pluck('World Region'));
        var casulaties = name_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));
        
        dc.barChart("#shark-attacks-chart-region")
            .width(1000)
            .height(300)
            .margins({top: 0, right: 50, bottom: 50, left: 50})
            .dimension(name_dim)
            .group(casulaties)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("")
            .yAxis().ticks(4);  


    dc.renderAll(); 
    
     };
     
     
     

