
function prov_drop_box(
            data, 
            personal_info, 
            questions, 
            supp_info_desc,
            // data_871067_skills,
            // data_870966_lang,
            // data_871076_epid,
            // data_871081_nurse,
            // data_871011_IM,
            // data_870966_modou  
        ){
    

    var prov_select = d3.select('#prov_select_div')
    .append("label")
    .attr("id", "sel_lbl_c")
    .attr("for", "select")
    .text("Volunteer Region of residence:")
    .style("width", "100%")
    .append('select')
    .attr("id", "select_c")
    .attr("class", "select_class")
    .style("width", "100%")
    .on("change", function(i){
        // debugger;
        on_change(
            personal_info, 
            questions, 
            supp_info_desc,
            // data_871067_skills,
            // data_870966_lang,
            // data_871076_epid,
            // data_871081_nurse,
            // data_871011_IM,
            // data_870966_modou            
            )            

    });
    ;

    prov_select
    .selectAll('optgroup')
    .data(data)
    .enter()
        .append('optgroup')
        .attr('label',function (d) { 
            return d.key
        })
        .selectAll('option')
            .data(function (d) { 
                return d.value 
            })
            .enter()
        .append('option')
            .attr('value',function (d) {
            // debugger;
                return d
            })
            .text(function (d) { 
                return d
            })

        console.log("Change Region")
        prov_select.property("value", "National Capital Region");
        prov_select.property("multiple", true);
        prov_select.property("size", '24');
        

}