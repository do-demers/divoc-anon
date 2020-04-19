function load_table(
                tbl_data, 
                // columns,
                // data_871067_skills,
                // data_870966_lang,
                // data_871076_epid,
                // data_871081_nurse,
                // data_871011_IM,
                // data_870966_modou
                ) {


                 
    var is_nurse = _.includes(_.map(document.getElementById("select_d").selectedOptions,'label'), "Degree in nursing");
    var is_epid = _.includes(_.map(document.getElementById("select_d").selectedOptions,'label'), "Degree in epidemiology");
    var is_IM = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Knowledge in IM tools or databases");
    var is_flex = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Able to work variable work hours");
    var is_period = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Longest period");
    // debugger;
    var headers = [
                    // '', //checkbox col.
                    'APPL_ID',
                    // "SRNM",
                    // "GVN_NAME",
                    // "EMAIL_ADRS", 
                    // "PERM_ADRS_LINE1", 
                    // "HM_PHN", 
                    "CITY_E_DESC", 
                    "PROV_E_DESC",
                    // "Other languages",
                    // "text_clean", 
                    // 'long period',
                    "text_clean_array",  
                    "Other skills",
                    // 'Epidemiology',
                    // 'Nursing',
                    // 'IM tools or databases',
                    // 'able to work variable work hours'
                ]

    if(is_nurse){
        headers.push("Nursing");
    }

    if(is_epid){
        headers.push("Epidemiology");
    }

    if(is_IM){
        headers.push("IM tools or databases");
    }

    if(is_flex){
        headers.push("able to work variable work hours");
    }

    if(is_period){
        headers.push("long period");
    }


    //Adding other languages
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_870966_lang, {APPL_ID: obj.APPL_ID}));
    // });

    //     //Adding other languages modou
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_870966_modou, {APPL_ID: obj.APPL_ID}));
    // });

    // //Adding other skills
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_871067_skills, {APPL_ID: obj.APPL_ID}));
    // });
//  debugger;
    d3.select("#total_stats").text(tbl_data.length)
    
    var table = d3.select('#tbl_div')
        .append('table')
        .attr("id", "adv_tbl")
        .attr("class", "table table-striped table-hover");

    var thead = table.append('thead');

    var tbody = table.append('tbody');

    thead.append('tr')
        .attr("class", "active")
        .attr("id", "main_row")
        .selectAll('th')
        .data(headers)
        .enter()
        .append('th')
        .text(function (d) {
            return d;
        });

    thead.append('tr')
        .attr("class", "filterRow")
        .attr("id", "filter_row")
        .selectAll('th')
        .data(headers)
        .enter()
        .append('th')
        .text('');


    // create a row for each object in the data
    var rows_grp = tbody
        .selectAll('tr')
        .data(tbl_data)
        .enter()
        .append('tr')
    ;

    // create a cell in each row for each column
    rows_grp
        .selectAll('td')
        .data(function (row) {
            return headers.map(function (header) {
                // debugger;
                return {
                    column: header,
                    value: row[header]
                };
            });
        })
        .enter()
        .append('td')
        .html(function (d) {
            return d.value;
        })

        $('#adv_tbl').DataTable({
            paging: true,
            searching: true,
            orderCellsTop: true,
            dom: 'Bfrtip',
            // columnDefs: [
            //     {
            //         orderable: false,
            //         className: 'select-checkbox',
            //         targets:   0
            //     } 
            // ],
            // select: {
            //     style:    'os',
            //     selector: 'td:first-child'
            // },
            // order: [[ 1, 'asc' ]],
            fixedColumns: true,
            buttons: [
                {
                    extend: 'csvHtml5',
                    title: 'csv'
                },
                {
                    extend: 'excelHtml5',
                    title: 'xlsx'
                },
                {
                    extend: 'pdfHtml5',
                    title: 'pdf',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                }
            ],
            initComplete: function () {

                    this.api().columns([2,3,4]).every(function () {
   
                    var column = this;
  
                    var select = $('<select><option value="">Tous</option></select>')
                        .appendTo($("#adv_tbl thead tr:eq(1) th").eq(column.index()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
    
                            column.search(val ? val : '', true, false)
                                .draw();
                        });

                        if(column[0][0] === 9) {
                            var tempxx = _.uniq(_.flatten(_.concat(_.map(column.data().unique(),function(d){
                                        return d.split(" ")
                                        })))).sort();
                
                                        var temp2 = _.uniq(_.map(tempxx, function(d){
                                            return d.replace(",","")
                                        })).sort()
                                        console.log(temp2)
                                        temp2.forEach(function (d, j) {
                                            select.append('<option>' + d + '</option>')
                                        });
                        }
                        else{
                            column.data().unique().sort().each(function (d, j) {
                                select.append('<option>' + d + '</option>')
                            });
                        }
                });

                console.log("loaded2")
            }
        });

        $("#submit_button").click(function(){
                   
               var refer_data = _.map(tbl_data, 'APPL_ID'); 

               var dataPost = {
                "APPL_IDs": refer_data
              };
          
                // debugger;
              $.ajax({
                  type: 'POST',
                  url: "ajax/table.php",
                  data: {myData:dataPost},
                  success: function(data){
                    alert('Items added');
                  },
              });
          
          });

}

function update_table(
            tbl_data, 
            // columns,
            // data_871067_skills,
            // data_870966_lang,
            // data_871076_epid,
            // data_871081_nurse,
            // data_871011_IM,
            // data_870966_modou
            ) {
                
                // debugger;
 
    var is_nurse = _.includes(_.map(document.getElementById("select_d").selectedOptions,'label'), "Degree in nursing");
    var is_epid = _.includes(_.map(document.getElementById("select_d").selectedOptions,'label'), "Degree in epidemiology");
    var is_IM = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Knowledge in IM tools or databases");
    var is_flex = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Able to work variable work hours");
    var is_period = _.includes(_.map(document.getElementById("select_k").selectedOptions,'label'), "Longest period");

    var headers = [
                // '', //checkbox col.
                'APPL_ID',
                // "SRNM",
                // "GVN_NAME",
                // "EMAIL_ADRS", 
                // "PERM_ADRS_LINE1", 
                // "HM_PHN", 
                "CITY_E_DESC", 
                "PROV_E_DESC",
                // "Other languages",
                // "text_clean", 
                // 'long period',
                "text_clean_array",  
                "Other skills",
                // 'Epidemiology',
                // 'Nursing',
                // 'IM tools or databases',
                // 'able to work variable work hours'
    ]


                if(is_nurse){
                    headers.push("Nursing");
                }
            
                if(is_epid){
                    headers.push("Epidemiology");
                }
            
                if(is_IM){
                    headers.push("IM tools or databases");
                }

                if(is_flex){
                    headers.push("able to work variable work hours");
                }
            
                if(is_period){
                    headers.push("long period");
                }
            

                // debugger;
    //Adding other languages
    // debugger;
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_870966_lang, {APPL_ID: obj.APPL_ID}));
    // });
 
    //     //Adding other languages modou
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_870966_modou, {APPL_ID: obj.APPL_ID}));
    // });
 
    // //Adding other skills
    // _.map(tbl_data, function(obj) {
    //     return _.assign(obj, _.find(data_871067_skills, {APPL_ID: obj.APPL_ID}));
    // });

    $('#adv_tbl').DataTable().destroy();

    var sorted_data = tbl_data;


    var table_u = d3.select('table');

    var tbody_u = table_u.select('tbody');

    // debugger;
        // .attr("id", "main_row")
    var thead_um = table_u.select('thead').select('#main_row');
    var thead_u_thm = thead_um.selectAll('th').data(headers);
    thead_u_thm.exit().remove();
    var thead_u_th_enterm = thead_u_thm.enter().append('th');
    thead_u_thm.merge(thead_u_th_enterm).text(function (label) { return label   });
    // debugger;

     // .attr("id", "filter_row")
    var thead_uf = table_u.select('thead').select('#filter_row');
    var thead_u_thf = thead_uf.selectAll('th').data(headers);
    thead_u_thf.exit().remove();
    var thead_u_th_enterf = thead_u_thf.enter().append('th');
    thead_u_thf.merge(thead_u_th_enterf).text(function (label) { return ""   });
    // debugger;
    // thead.append('tr')
    // .attr("class", "filterRow")
    // .selectAll('th')
    // .data(headers)
    // .enter()
    // .append('th')
    // .text('');


    var rows_grp_u = tbody_u.selectAll('tr').data(sorted_data);

    rows_grp_u.exit().remove();

    var rows_grp_enter_u = rows_grp_u.enter().append('tr');

    var new_tds = rows_grp_u.merge(rows_grp_enter_u).selectAll('td').data(function (row) {
        return headers.map(function (column) {
            // debugger;
            return {
                column: column,
                value: row[column]
            };
        });
    });

    new_tds.exit().remove();

    new_tds.html(function (d) {
            return d.value;
    });

    new_tds.enter().append('td').html(function (d) {
        return d.value;
    });

    $('#adv_tbl').DataTable({
        paging: true,
        searching: true,
        orderCellsTop: true,
        dom: 'Bfrtip',
        // columnDefs: [
        //     {'max-width': '20%', 'targets': 5}
        // ],
        buttons: [
            {
                extend: 'csvHtml5',
                title: 'csv'
            },
            {
                extend: 'excelHtml5',
                title: 'xlsx'
            },
            {
                extend: 'pdfHtml5',
                title: 'pdf',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            }
        ],
        initComplete: function () {
            this.api().columns([1,2,3]).every(function () {
     
                var column = this;
                console.log(column.index())
                console.log($("#adv_tbl thead tr:eq(1) th").val())
   
                var select = $('<select><option value="">Tous</option></select>')
                    .appendTo($("#adv_tbl thead tr:eq(1) th").eq(column.index()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column.search(val ? val : '', true, false)
                        // column.search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });


                    if(column[0][0] === 9) {

                        var tempxx = _.uniq(_.flatten(_.concat(_.map(column.data().unique(),function(d){
                                    return d.split(" ")
                                    })))).sort();
            
                                    var temp2 = _.uniq(_.map(tempxx, function(d){
                                        return d.replace(",","")
                                    })).sort()
                                    console.log(temp2)
                                    temp2.forEach(function (d, j) {
                                        select.append('<option>' + d + '</option>')
                                    });
                    }
                    else{
  
                        column.data().unique().sort().each(function (d, j) {
                            select.append('<option>' + d + '</option>')
                        });
                    }

            });
            console.log("loaded3")
        }
    });

}


