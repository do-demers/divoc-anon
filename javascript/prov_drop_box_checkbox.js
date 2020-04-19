

function prov_drop_box_check(data){
    

    // debugger;
    var countryWrapper = d3.select('#check_box_div');
    
    var countryButton = countryWrapper
            .selectAll("input")
            .data(data)
            .enter()
            .append("div")

    countryButton
        .append("input")
            .attr("type", "checkbox")
            .attr("id", function(d) { return d.key; })
            .attr("value", function(d) { return d.key; })
            // .attr("class", "checkboxes");

    countryButton.append("label")
        .attr('for', function(d) { return d.key; })
        .text(function(d) { return d.key; })
        // .attr("class", "checkboxes");



    // var prov_select = d3.select('#prov_select_div')
    // .append("label")
    // .attr("id", "sel_lbl_c")
    // .attr("for", "select")
    // .text("Volunteer area of residence:")
    // .style("width", "100%")
    // .append('select')
    // .attr("id", "select_c")
    // .attr("class", "select_class")
    // .style("width", "100%")
    // .on("change", function(i){
    //     on_change(personal_info, questions, supp_info_desc)            
    // });
    // ;

    // d3.select('#prov_select_div')
    //     .selectAll('input')
    //     .data(data)
    //     .enter()
    //         .append('label')
    //         .attr('label',function (d) { 
    //             return d.key})
    //     .selectAll('option')
    //         .data(function (d) { 
    //             return d.value 
    //         })
    //         .enter()
    //     .append('option')
    //         .attr('value',function (d) {
    //             // debugger;
    //                 return d
    //             })
    //         .text(function (d) { 
    //             return d
    //         })


    //     prov_select.property("value", "National Capital Region");
    //     prov_select.property("multiple", true);
    //     prov_select.property("size", '24');
        

}