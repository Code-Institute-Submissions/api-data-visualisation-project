queue()
        .defer(d3.json, "static/data/shark-attacks.json")
        .await(makeGraphs);

    function makeGraphs(error, sharkattackdData) {
        var ndx = crossfilter(sharkattackdData);

        var name_dim = ndx.dimension(dc.pluck('World Region'));
        var casulaties = name_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));
        
        

        dc.barChart("#shark-attacks-chart-region")
            .width(800)
            .height(500)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(casulaties)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("World Region")
            .yAxis().ticks(4);
            
 /*----------------------------------------------------*/  

        
        var casulaties = name_dim.group().reduceSum(dc.pluck('Number of Non Fatal Attacks'));
        
        dc.barChart("#shark-attacks-chart-country")
            .width(1024)
            .height(100)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(casulaties)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("country")
            .yAxis().ticks(4);  
            
        var name_dim = ndx.dimension(dc.pluck('Total Number of Attacks'));
        var casulaties = name_dim.group().reduceSum(dc.pluck('Country'));
        
        
        

        
  /*----------------------------------------------------------------------*/ 

        dc.pieChart('#pie-chart')
 
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(casulaties);

        var state_dim = ndx.dimension(dc.pluck('World Region'));
        var casulaties_attacks_region = state_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));

        dc.pieChart('#pie-chart')
            .height(300)
            .radius(600)
            .transitionDuration(1500)
            .dimension(state_dim)
            .group(casulaties_attacks_region);       

   /*----------------------------------------------------------------------*/ 
   
         var name_dim = ndx.dimension(dc.pluck('name'));

        var spendByNameStoreA = name_dim.group().reduceSum(function (d) {
                if (d.store === 'A') {
                    return +d.spend;
                } else {
                    return 0;
                }
            });
        var spendByNameStoreB = name_dim.group().reduceSum(function (d) {
                if (d.store === 'B') {
                    return +d.spend;
                } else {
                    return 0;
                }
            });

        var stackedChart = dc.barChart("stacked-chart");
         
        stackedChart
            .width(500)
            .height(500)
            .dimension(name_dim)
            .group(spendByNameStoreA, "Store A")
            .stack(spendByNameStoreB, "Store B")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));

        stackedChart.margins().right = 100;
        
/*----------------------------------------------------------------------------*/ 

        


        var name_dim = ndx.dimension(dc.pluck('Country'));
        var casulaties = name_dim.group().reduceSum(dc.pluck('Total Number of Attacks'));
        
            

        dc.barChart("#shark-attacks-chart-region")
            
            .width(1800)
            .height(300)
            .margins({top: 50, right: 100, bottom: 40, left: 100})
            .mouseZoomable(true)
            .dimension(name_dim)
            .group(casulaties)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Country")
            .yAxis().ticks(1);
     
        dc.renderAll();
     };
