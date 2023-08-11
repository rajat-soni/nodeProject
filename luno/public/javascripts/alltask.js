
$(document).ready(function () {

  // code end for fetch sender details after selecting client name


  // Code start for All Task
  var dataTable = $('#apptask').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'order': [[0, 'desc']],
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_data',

    },

    'aaSorting': [],
    'columns': [
      { data: 'balst_dt' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          return `

                  



                   
                    <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                    <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + `"><i class="fa fa-pencil"></i></button>

                    <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                                          
                      `;
        }
      }


    ]


  });


  /* End code for All Task */


  /* Start code for priority Task */

  var dataTable = $('#task_priorities').DataTable({



    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_prioritydata',

    },

    'aaSorting': [],
    'columns': [

      // { "mData": 0 , //or address field
      // "mRender" : function ( data, type, full ) { 
      // //data = mData
      // //full is the full array address= [0] city = [1] state=[2] zip=[3] 
      //    return data+', '+blast_date+', '+blast_time;}
      //  },
      { data: 'blast_date' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          return `
                    
                      <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>

                      <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + `"><i class="fa fa-pencil"></i></button>

                      <button type="button" class="btn btn-link btn-sm view1"  data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });

  /* End code for priority Task */






  /* Start code for Today's Task */

  var dataTable = $('#todaysstask').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_todaytaskdata',

    },

    'aaSorting': [],
    'columns': [

      { data: 'blast_date' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          return `
                    
<button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>

                      <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + `"><i class="fa fa-pencil"></i></button>


                      <button type="button" class="btn btn-link btn-sm view1"  data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });

  /* End code for Today's Task */






  /* Start code for Weekly Task */

  var dataTable = $('#weeklytasks').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_weeklytaskdata',

    },

    'aaSorting': [],
    'columns': [

      { data: 'blast_date' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          return `
                    
<button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>

                      <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + `"><i class="fa fa-pencil"></i></button>

                      <button type="button" class="btn btn-link btn-sm view1"  data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });



  /* End code for This week Task */



  $('#add_data').click(function () {

    $('#dynamic_modal_title').text('Add Data');

    $('#task_form')[0].reset();

    $('#action').val('Add');

    $('#action_button').text('Add');

    $('#action_modal').modal('show');

    $("#addcname").show();

    console.log("Add form");


    $('#cname').on('change', function () {
      // var id = request.body.id;

      $("#addcname").show();
      $("#eblst_type").show();
      $("#reblst_type").hide();
      $("#reblst").hide();

      var cname = $("#cname").val();
      var cname = $(this).val();
      console.log("CNAME");
      console.log(cname);
      // alert(val);
      if ($(this).val()) {
        // console.log(blast_type);
        $("#senerdtl").show();
        console.log("Code above ajax");
        $.ajax({
          url: "http://localhost:3000/alltask/action",
          method: "POST",
          data: { cname: cname, action: 'fetch_senderdtladd' },

          dataType: "JSON",
          success: function (data) {
            $('#cname').val(data.cid);
            $('#sender_name').val(data.sender_name);
            $('#sender_email').val(data.sender_email);

            // $('#id').val(data.id);

            setTimeout(function () {
              $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
              $('#message').html('');
            }, 5000);

          }
        });



        // $("#reblastassets").hide();

      }
      else {
        // $("#asset_name").show();
        $("#senerdtl").hide();


      }
    });

    var action = $("#action").val();
    console.log("action Rajashri");
    console.log(action);
    if (action === "Add") {
      console.log("Add action within if condition");
      $("#addcname").show();
      $("#ebassets").hide();
      $("#reblastassets").hide();
      $("#viewdata11").hide();
      $("#editdataa").show();
      $("#eblst_type").show();
      $("#reblst_type").hide();
      $("#reblst").hide();
      $("#eblst1").show();
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      $('#blast_date').attr('min', today);
      // $('#rb_date').attr('min',today);






    }


    $('#blast_type').on('change', function () {
      // var id = request.body.id;
      console.log("rajashri sonal");


      var blast_type = $("#blast_type").val();
      var blast_type = $(this).val();
      // alert(val);
      //if(action=="Add") 

      if (blast_type == "E-blast") {

        $("#assets").show();
        $("#reblastassets").hide();
        $("#ebassets").hide();
      }

      else if (blast_type == 'Reminder-Blast') {
        console.log("Reminder blast");
        $("#reblastassets").hide();
        $("#assets").hide();
        $("#ebassets").hide();
      }


      else {
        // $("#asset_name").show();
        $("#reblastassets").hide();
        $("#assets").hide();
        $("#ebassets").hide();
      }



    });










  });





  $('#task_form').on('submit', function (event) {

    event.preventDefault();



    $.ajax({

      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: $('#task_form').serialize(),
      dataType: "json",
      beforeSend: function () {
        $('#action_button').attr('disabled', 'disabled');
      },

      success: function (data) {
        $('#message').html('<div class="alert alert-success">' + data.message + '</div>');

        $('#action_button').attr('disabled', false);
        $('#leftnav').DataTable().ajax.reload();
        $('#apptask').DataTable().ajax.reload();
        $('#task_priorities').DataTable().ajax.reload();
        $('#todaysstask').DataTable().ajax.reload();
        $('#weeklytasks').DataTable().ajax.reload();
        // $('#task_priorities').DataTable().ajax.reload();


        $('#action_modal').modal('hide');



        setTimeout(function () {
          $('#message').html('');
        }, 5000);



      }

    });

  });



  // Code End For View Data






  $('#edit_data').click(function () {


    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');

  });


  $(document).on('click', '.edit', function () {
    //alert("Edit data");

    console.log("Edit data js file");


    //  var id = $(this).data('id');

    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');


    $("#reblastassets").hide();
    $('#blast_typerr').prop('selectedIndex', -1);

    // var action = $("#action").val();

    var action = $("#action").val();
    if (action === "Edit") {

      $("#rballocated_to option").prop('disabled', false);
      $("#editcname").show();
      $("#reblst").show();
      $("#viewdata").hide();

      $("#editdataa").show();
      $("#eblst_type").hide();
      $("#reblst_type").show();


      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      //$('#blast_date').attr('min',today);
      $('#rb_date').attr('min', today);


      var idtype = $(this).data('id');
      const myArray = idtype.split(" ");

      var id = myArray[0];
      var ebstatus = myArray[1];
      var eballocatedto = myArray[2];
      var blast_date = myArray[3];
      var rb_type = myArray[4];

      console.log("id " + id);
      console.log("ebstatus " + ebstatus);
      console.log("eballocatedto " + eballocatedto);
      console.log("blast_date " + blast_date);
      console.log("rb_type " + rb_type);


      if (rb_type == "") {
        if (ebstatus == "0" && blast_date < today) {
          console.log("Status");
          console.log(ebstatus);
          console.log(" option  disaabled");
          $("#rballocated_to option[value=" + eballocatedto + "]").attr("disabled", "disabled");
        }
        else {
          console.log("Else condition True");
          $("#rballocated_to ").removeAttr("disabled", "disabled");

        }

      }



    }





    $('#cname').on('change', function () {


      var cname = $("#cname").val();
      var cname = $(this).val();

      if ($(this).val()) {
        console.log("Selected value:" + cname);
        $("#senerdtl").show();
        console.log("Code above ajax");
        $.ajax({
          url: "http://localhost:3000/alltask/action",
          method: "POST",
          data: { id: id, cname: cname, action: 'fetch_senderdtl' },

          dataType: "JSON",
          success: function (data) {
            console.log("Success function");

            // $('#cname').val(data.cname);
            $('#sender_name').val(data.sender_name);
            $('#sender_email').val(data.sender_email);

            // $('#id').val(data.id);

            setTimeout(function () {
              $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
              $('#message').html('');
            }, 5000);

          }
        });





      }
      else {
        // $("#asset_name").show();
        $("#senerdtl").hide();


      }
    });
    if (action === "Edit") {
      console.log(" Rajashri Edit Action if condition");
      // $("#viewdata1").hide();
      $("#ebassets").show();
      $("#assets").hide();
      $("#viewdata11").hide();
      $("#eblst1").hide();
      $("#senerdtl").show();
      //$("#reblastassets").hide();




    }

    $('#blast_typerr').on('change', function () {
      // var id = request.body.id;

      var action = $("#action").val();


      var blast_type = $("#blast_type").val();
      var blast_type = $(this).val();



      // alert(val);
      if (blast_type == 'E-blast') {
        console.log(blast_type);
        $("#ebassets").show();
        $("#assets").hide();
        $("#reblastassets").hide();

      }

      else if (blast_type == 'Reminder-Blast') {
        $("#ebassets").show();
        $("#reblastassets").show();
        $("#assets").hide();
      }


      else {
        // $("#asset_name").show();
        $("#reblastassets").hide();
        $("#assets").hide();

      }
    });






    console.log("Rajashri new edit action");
    console.log(id);

    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_single' },

      dataType: "JSON",
      success: function (data) {

        $('#cname').val(data.cname);
        $('#camp_name').val(data.camp_name);
        $('#camp_from').val(data.camp_from);
        $('#blast_count').val(data.blast_count);

        $('#ebstatus').val(data.status);
        $('#eballocated_to').val(data.allocated_to);

        $('#asset_name').val(data.asset_name);
        $('#asset_link').val(data.asset_link);
        $('#rb_assetname').val(data.rb_assetname);
        $('#rb_asset_link').val(data.rb_assetlink);
        $('#rb_date').val(data.rb_date);
        $('#rb_time').val(data.rb_time);
        $('#rballocated_to').val(data.rballocated_to);
        $('#ebasset_name').val(data.asset_name);
        $('#ebasset_link').val(data.asset_link);
        $('#sender_name').val(data.sender_name);
        $('#sender_email').val(data.sender_email);
        $('#tact').val(data.tact);
        $('#blast_type').val(data.blast_type);
        $('#blast_date').val(data.blast_date);
        $('#blast_time').val(data.blast_time);
        $('#blast_date1').val(data.blast_date);
        $('#blast_time1').val(data.blast_time);
        $('#comment').val(data.comment);
        $('#priority').val(data.priority);
        $('#allocated_to').val(data.allocated_to);
        $('#id').val(data.id);

        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);
        //console.log("Rajashri Success new edit action");

      }
    });



  });





  $('#view_data').click(function () {


    $('#dynamic_modal_title').text('View Data');

    $('#action').val('view1');

    $('#action_button').text('view1');

    $('#action_modal').modal('show');

  });


  $(document).on('click', '.view1', function () {



    var id = $(this).data('id');
    // var id=myArray[0];
    // var ebstatus=myArray[1];
    // var eballocatedto=myArray[2];
    // var blast_date=myArray[3];
    // var rb_type=myArray[4];

    console.log("id " + id);


    $('#dynamic_modal_title').text('View Data');

    $('#action').val('view1');

    $('#action_button').text('View');
    // $("#action_button").css("display","none");
    $('#action_modal').modal('show');



    var action = $("#action").val();
    console.log("View1 action Rajashri");
    console.log(action);
    if (action === "view1") {
      console.log("If View condition is true");
      $("#viewdata11").show();
      $("#editdataa").hide();

    }



    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_single_view' },

      dataType: "JSON",
      success: function (data) {
        if (data.rb_assetname == "") {
          console.log("RB Asset Empty rbassetss hide");
          $("#rbassetss").hide();
        }
        else {
          console.log("RB Asset not Empty rbassetss show");
          $("#rbassetss").show();
        }

        $('#cnameview').val(data.client_name);
        $('#camp_nameview').val(data.camp_name);
        $('#camp_fromview').val(data.camp_from);
        $('#blast_countview').val(data.blast_count);
        $('#commentview').val(data.comment);
        // $('#asset_name').val(data.asset_name);
        // $('#asset_link').val(data.asset_link);
        $('#rb_assetnameview').val(data.rb_assetname);
        $('#rb_asset_linkview').val(data.rb_assetlink);
        $('#rb_dateview').val(data.rb_date);
        $('#rb_timeview').val(data.rb_time);
        $('#ebasset_nameview').val(data.asset_name);
        $('#ebasset_linkview').val(data.asset_link);
        $('#sender_nameview').val(data.sender_name);
        $('#sender_emailview').val(data.sender_email);
        $('#tactview').val(data.tact);
        $('#blast_typeview').val(data.blast_type);
        // $('#blast_date').val(data.blast_date);
        // $('#blast_time').val(data.blast_time);
        $('#blast_date1view').val(data.blast_date);
        $('#blast_time1view').val(data.blast_time);

        $('#priorityview').val(data.priority);
        $('#first_nameview').val(data.first_name);
        $('#id').val(data.id);

        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);

      }
    });


  });



  $(document).on('click', '.delete', function () {

    var id = $(this).data('id');

    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: "http://localhost:3000/alltask/action",
        method: "POST",
        data: { action: 'delete', id: id },
        dataType: "JSON",
        success: function (data) {

          $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);
        }
      });
    }

  });
});
