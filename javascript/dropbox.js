
function drop_box(
        drop_data, 
        variable, 
        prefix,
        start_var,
        label,
        personal_info,
        questions,
        supp_info_desc,
        // data_871067_skills,
        // data_870966_lang,
        // data_871076_epid,
        // data_871081_nurse,
        // data_871011_IM,
        // data_870966_modou
    ) {

    var var_list = drop_data;
    var var_select = d3.select("#"+variable)
        .append("label")
        .attr("id", "sel_lbl" + prefix)
        .attr("for", "select")
        .text(function () {
            return label;
        })
        .style("width", "100%")
        .append('select')
        .attr("id", "select" + prefix)
        .attr("class", "select_class")
        .style("width", "100%")
        .on("change", function(i){
            // console.log(document.getElementById("loader"));
            on_change(
                personal_info, 
                questions,
                supp_info_desc,
                data_871067_skills,
                data_870966_lang,
                // data_871076_epid,
                // data_871081_nurse,
                // data_871011_IM,
                data_870966_modou
                )            
        });

    var_select
        .selectAll("option")
        .data(var_list)
        .enter()
        .append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        })
        .style('color', function(d) {
            // return _.contains(var_estimates, d) ? 'rgb(211, 8, 12)' : 'black';
        })

    var_select.property("value", start_var);
    var_select.property("multiple", true);
    var_select.property("size", '5');
    
    
 
};

