
//Language check
var isFr = false;
if (document.documentElement.lang === "fr") isFr = true;

function loading() {
  console.log("loading...")
  d3.select("#loader").style("display", "block");
}

function loaded() {
// debugger;
  d3.select("#loader").style("display", "none");
  console.log("loaded")
}

loading();

var wait;

function init_table() {

    d3.queue()
    .defer(d3.csv, 'data/screening_tool/PERSONAL_INFO_TXT_FINAL_ANON.csv')//personal info
        .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_NO_TXT_ANON.csv')//screening questions
        .defer(d3.csv, 'data/screening_tool/SUPP_INFO_DESC_FINAL.csv') //screening question desc
        // .defer(d3.csv, 'data/screening_tool/WORK_LOCATION_FINAL.csv')//work location
        // .defer(d3.csv, 'data/screening_tool/WORK_LOCATION_DESC_FINAL.csv') //work loc desc
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_871067.csv') //screening question desc   other_skills 
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_870961.csv') //screening question desc   long_period
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_870966.csv') //screening question desc   other lang
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_871076.csv') //screening question desc   Epid
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_871081.csv') //screening question desc   Nurse
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_871011.csv') //screening question desc   IM_know 
        // .defer(d3.csv, 'data/screening_tool/APPL_SUPP_INF_870963.csv') //screening question desc   Shifts
        // .defer(d3.csv, 'data/screening_tool/other_lang_modou.csv') //screening question desc     modou    
        .await(screening_tool);//only function name is needed
}


function screening_tool(error, 
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
    if (error) {
        console.log("*** ERROR LOADING FILES: " + error + " ***");
    }
  
    // debugger;
    var prov_reg_list = _.map(_.groupBy(personal_info, "PROV_E_DESC" ), function(n,i) {
        return {
                key:i,
                value:_.uniq(_.map(n, "REG_E_DESC")).sort()
            };
      });

      // debugger;
     
    var max_EUDC_list = _.uniq(_.map(personal_info, "MAX_ACDMC_LVL_grp")).sort();
    var OLS_list = _.uniq(_.map(personal_info, "OLS_E_DESC")).sort();
    
    var degree_q_list = _.uniq(_.map(_.filter(supp_info_desc, {'question_cat_en': "degree"}),"question_short_en")).sort();
    var func_q_func = _.uniq(_.map(_.filter(supp_info_desc, {'question_cat_en': "func"}),"question_short_en")).sort();
    var know_other_q_list = _.uniq(_.map(_.filter(supp_info_desc, { 'question_cat_en': "know_other"}),"question_short_en")).sort();
    var lang_q_list = _.uniq(_.map(_.filter(supp_info_desc, { 'question_cat_en': "lang"}),"question_short_en")).sort();
     // var other_q_list = _.uniq(_.map(_.filter(supp_info_desc, { 'question_cat_en': "other"}),"question_short_en")).sort();

    //here with setting the dataset with initial values.
     // var init_edu = _.uniq(_.map(_.filter(personal_info, { 'MAX_ACDMC_LVL_grp': "Bachelors degree"}), 'APPL_ID')).sort();
    // var init_ols = _.uniq(_.map(_.filter(personal_info, { 'OLS_E_DESC': "Bilingual"}), 'APPL_ID')).sort();
    var init_reg = _.uniq(_.map(_.filter(personal_info, { 'REG_E_DESC': "National Capital Region"}), 'APPL_ID')).sort();
    var init_question = _.uniq(_.map(_.filter(questions, { 'SPPLMNTL_INFO_ID': "871081", "APPLCNT_ANS":"1"}), 'APPL_ID')).sort();
    var init_lang = _.uniq(_.map(_.filter(questions, { 'SPPLMNTL_INFO_ID': "871118", "APPLCNT_ANS":"1"}), 'APPL_ID')).sort();
  
    // var vol_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID: "871089", 'APPLCNT_ANS': "1" } ),'APPL_ID');
    // var travel_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID: "870964", 'APPLCNT_ANS': "1" } ),'APPL_ID');
    // var flex_q = _.map(_.filter(questions, {SPPLMNTL_INFO_ID: "870963", 'APPLCNT_ANS': "1" } ),'APPL_ID');
  
    var inter_appl = _.intersectionBy(
                        // init_edu, 
                        // init_ols, 
                        init_reg, 
                        init_question,
                        init_lang,
                        // vol_q, 
                        // travel_q, 
                        // flex_q
                        );

                        // debugger;

    var init_personal_info = _.filter(personal_info, function(o) { return _.includes(inter_appl, o.APPL_ID); });
   
    loading();
    wait = setTimeout(function () {

        //Prov:
        prov_drop_box(
          prov_reg_list, 
          personal_info, 
          questions, 
          supp_info_desc,
          // data_871067_skills,
          // data_870966_lang,
          // data_871076_epid,
          // data_871081_nurse,
          // data_871011_IM,
          // data_870966_modou
          );
        // prov_drop_box_check(prov_reg_list);

       var drop_box_list_items = [
                              {
                                "elements":max_EUDC_list,
                                "div":"max_edu_div",
                                "suffix": "_e",
                                "start_val":"",
                                "label":"Max Level of Education:",
                                "pers_info":personal_info,
                                "questions":questions,
                                "supp_info":supp_info_desc,
                                // "skills_txt":data_871067_skills,
                                // "lang_txt":data_870966_lang,
                                // "modou":data_870966_modou
                              },
                              {
                                "elements":OLS_list,
                                "div":"OLS_div",
                                "suffix": "_o",
                                "start_val":"",
                                "label":"Language:",
                                "pers_info":personal_info,
                                "questions":questions,
                                "supp_info":supp_info_desc,
                                // "skills_txt":data_871067_skills,
                                // "lang_txt":data_870966_lang,
                                // "modou":data_870966_modou
                              },
                              {
                                "elements":degree_q_list,
                                "div":"degree_div",
                                "suffix": "_d",
                                "start_val":"Degree in nursing",
                                "label":"Degree Category:",
                                "pers_info":personal_info,
                                "questions":questions,
                                "supp_info":supp_info_desc,
                                // "skills_txt":data_871067_skills,
                                // "lang_txt":data_870966_lang,
                                // "modou":data_870966_modou
                              },
                              {
                                "elements":func_q_func,
                                "div":"func_div",
                                "suffix": "_f",
                                "start_val":"",
                                "label":"Functional Competencies:",
                                "pers_info":personal_info,
                                "questions":questions,
                                "supp_info":supp_info_desc,
                                // "skills_txt":data_871067_skills,
                                // "lang_txt":data_870966_lang,
                                // "modou":data_870966_modou
                              },
                              {
                                "elements":know_other_q_list,
                                "div":"knowledge_div",
                                "suffix": "_k",
                                "start_val":"",
                                "label":"Knowledge ond Other Categories::",
                                "pers_info":personal_info,
                                "questions":questions,
                                "supp_info":supp_info_desc,
                                // "skills_txt":data_871067_skills,
                                // "lang_txt":data_870966_lang,
                                // "modou":data_870966_modou
                              }

                            ]

        _.map(drop_box_list_items, function(d){
              drop_box(
                d.elements, //list of elements
                d.div, //id of div to attach select
                d.suffix, //suffix of id for select
                d.start_val,  // start value, none if set to ""
                d.label, //text for label
                d.pers_info, //Personal data that will be passed to Table
                d.questions, //Question descriptions that will be passed to Table
                d.supp_info, //Text answers (yes/no only) that will be passed to Table
                // d.skills_txt, //Other skills (free-text) that will be passed to Table
                // d.lang_txt, //Other langauges answer (free-text) that will be passed to Table
                // data_871076_epid,
                // data_871081_nurse,
                // data_871011_IM,
                // d.modou //Modou structured free-text field
              );

        })
        
        // debugger;
        load_table(
          init_personal_info, 
          // personal_info.columns,
          // data_871067_skills,
          // data_870966_lang,
          // data_871076_epid,
          // data_871081_nurse,
          // data_871011_IM,
          // data_870966_modou
          )

        loaded()

    }, 1);

};



