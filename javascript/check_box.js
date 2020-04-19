

function check_box(personal_info, questions, supp_info_desc) {

    //Volunteer
    var var_select = d3.select("#form")
        .append("input")
            .attr("id", "volunteer")
            .attr("type", "checkbox")
            .attr("name", "volunteer")
            .attr("checked", "true")
            .on("change", function(i){
                on_change(personal_info, questions, supp_info_desc)            
            });

    var var_select = d3.select("#form")
        .append("label")
            .attr("for", "volunteer")
            .text("True Volunteer")

    //Travel
    var var_select = d3.select("#form")
            .append("input")
                .attr("id", "travel")
                .attr("type", "checkbox")
                .attr("name", "travel")
                .attr("checked", "true")
                .on("change", function(i){
                    on_change(personal_info, questions, supp_info_desc)            
                });

    var var_select = d3.select("#form")
            .append("label")
                .attr("for", "travel")
                .text("Willing to Travel")

    //flex
    var var_select = d3.select("#form")
        .append("input")
            .attr("id", "flex")
            .attr("type", "checkbox")
            .attr("name", "flex")
            .attr("checked", "true")
            .on("change", function(i){
                on_change(personal_info, questions, supp_info_desc)            
            });

    var var_select = d3.select("#form")
        .append("label")
            .attr("for", "flex")
            .text("Willing Flex hours")


    
}


