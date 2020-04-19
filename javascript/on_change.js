
function on_change(personal_info,
          questions,
          supp_info_desc,
        //   data_871067_skills,
        //   data_870966_lang,
          // data_871076_epid,
          // data_871081_nurse,
          // data_871011_IM,
        //   data_870966_modou
          ){

   
    loading();
  
    // debugger;
    new_city = _.map(document.getElementById("select_c").selectedOptions,'label');
    new_edu = _.map(document.getElementById("select_e").selectedOptions,'label');
    new_ols = _.map(document.getElementById("select_o").selectedOptions,'label');
    new_degree = _.map(document.getElementById("select_d").selectedOptions,'label');
    new_func = _.map(document.getElementById("select_f").selectedOptions,'label');
    new_know = _.map(document.getElementById("select_k").selectedOptions,'label');
  // debugger;
    
    // var new_vol = $("#volunteer").is(":checked") ? "1" : "0";
    // var new_travel = $("#travel").is(":checked") ? "1" : "0";
    // var new_flex = $("#flex").is(":checked") ? "1" : "0";

    // var vol_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID:"871089", 'APPLCNT_ANS': new_vol } ),'APPL_ID');
    // var travel_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID:"870964", 'APPLCNT_ANS': new_travel } ),'APPL_ID');
    // var flex_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID:"870963", 'APPLCNT_ANS': new_flex } ),'APPL_ID');
  
    var new_appl_city = _.map(_.filter(personal_info, function(o) {return _.isEmpty(new_city) ? _.isEmpty(new_city) : _.includes(new_city, o.REG_E_DESC) }),'APPL_ID');
    var new_appl_edu = _.map(_.filter(personal_info, function(o) {return  _.isEmpty(new_edu) ? _.isEmpty(new_edu) : _.includes(new_edu, o.MAX_ACDMC_LVL_grp); }),'APPL_ID');
    var new_appl_ols_temp = _.map(_.filter(supp_info_desc, function(o) {return _.includes(new_ols, o.question_short_en); }),'SPPLMNTL_INFO_ID');
    var new_appl_ols =  _.uniq(_.map(_.filter(questions, function(o){
                                    return ( (_.isEmpty(new_appl_ols_temp) ? _.isEmpty(new_appl_ols_temp) :   _.includes(new_appl_ols_temp, o.SPPLMNTL_INFO_ID)) 
                                           && o.APPLCNT_ANS === "1")
                                }), 'APPL_ID'))
  
    // get id of questions
    var new_degree_id_temp = _.map(_.filter(supp_info_desc, function(o) {return _.includes(new_degree, o.question_short_en); }),'SPPLMNTL_INFO_ID');
    var new_func_id_temp = _.map(_.filter(supp_info_desc, function(o) {return _.includes(new_func, o.question_short_en); }),'SPPLMNTL_INFO_ID');
    var new_know_id_temp = _.map(_.filter(supp_info_desc, function(o) {return _.includes(new_know, o.question_short_en); }),'SPPLMNTL_INFO_ID');

    var new_appl_degree_q =  _.uniq(_.map(_.filter(questions, function(o){
                                    return ( (_.isEmpty(new_degree_id_temp) ? _.isEmpty(new_degree_id_temp) :   _.includes(new_degree_id_temp, o.SPPLMNTL_INFO_ID)) 
                                            && o.APPLCNT_ANS === "1")
                                }), 'APPL_ID'))
    
    var new_appl_func_q =  _.uniq(_.map(_.filter(questions, function(o){
                                    return (
                                        (_.isEmpty(new_func_id_temp) ?  _.isEmpty(new_func_id_temp) :  _.includes(new_func_id_temp, o.SPPLMNTL_INFO_ID)) 
                                            && o.APPLCNT_ANS === "1")
                                }), 'APPL_ID'))

    var new_appl_know_q =  _.uniq(_.map(_.filter(questions, function(o){
                                    return ( (_.isEmpty(new_know_id_temp) ? _.isEmpty(new_know_id_temp) :  _.includes(new_know_id_temp, o.SPPLMNTL_INFO_ID)) 
                                            && o.APPLCNT_ANS === "1")
                                }), 'APPL_ID'))


                                // debugger;
    var inter_APPL = _.intersectionBy(
            new_appl_city,
            new_appl_edu, 
            new_appl_ols, 
            new_appl_degree_q, 
            new_appl_func_q, 
            new_appl_know_q
            // vol_q,
            // travel_q,
            // flex_q
            );

    var personal_info_upd = _.filter(personal_info, function(o) { return _.includes(inter_APPL, o.APPL_ID); });
 
    d3.select("#total_stats").text(personal_info_upd.length)
    update_table(
        personal_info_upd, 
        // personal_info.columns,
        // data_871067_skills,
        // data_870966_lang,
        // data_871076_epid,
        // data_871081_nurse,
        // data_871011_IM,
        // data_870966_modou
        );

    // debugger;
    loaded();
}