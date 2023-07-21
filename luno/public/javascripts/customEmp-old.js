
$(document).ready(function () { // for fetch Data //

   //     load_data();

   // function load_data() {

   //  var user_id = $("#user_id").val();
   //  alert("")

   var dataTable = $('#tdata').DataTable({

      'processing': true,
      'serverSide': true,
      'serverMethod': 'get',
      'ajax': {
         'url': 'http://localhost:3000/customEmp/get_data'
      },
      'aaSorting': [],
      'columns': [
         { data: 'camp_name' },
         { data: 'asset_name' },
         { data: 'blst_type' },
        // { data: 'blast_type' },
         //   { data : 'user_id' },
         { data: 'id' },
      //  { data : 'status' }
        




      ],

      columnDefs: [
         {
            targets: 3,
            orderable: false,
            render: function (data, type, row, meta) {
               console.log("id" +row.id);
               return `
                   
                 ${(row.status == 1) ? `<b><i  id ="msgshow" class="bi bi-check"style="font-size:26px;"></i></b>` : (row.status == 2 ) ? `<i  id ="msgshow" class="bi bi-check"style="font-size:26px;"><i  id ="msgshow" class="bi bi-check "style="font-size:26px;"></i>` : `<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`}
                 
                 
              
                 
                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ data + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>

                
                     
                     `;
            }
         }


      ]


   });

   $('#add_data').click(function () { // for insert the Data //

      $('#dynamic_modal_title').text('Add Data');
      ``
      $('#sample_form')[0].reset();

      $('#action').val('Add');

      $('#action_button').text('Add');

      $('#action_modal').modal('show');

   });

   //  var isVal = true;
   $('#sample_form').on('submit', function (event) {


      event.preventDefault();









   });





   $(document).on('click', '.view', function () {
      //alert("Edit data");
      console.log("View Section");
      var id = $(this).data('id');
      

      $('#dynamic_modal_title').text('View Data');

      $('#action').val('view');

      $('#action_button').text('view');

      $('#action_modal').modal('show');


      $.ajax({
         url: "http://localhost:3000/customEmp/action",
         method: "POST",
         data: { id: id, action: 'fetch_single' },

         dataType: "JSON",
         success: function (data) {


            $('#camp_name').val(data.camp_name);
            $('#camp_from').val(data.camp_from);
            $('#asset_name').val(data.asset_name);

            $('#asset_name').val(data.asset_name);
            $('#asset_link').val(data.asset_link);
            $('#tact').val(data.tact);
            $('#blast_type').val(data.blast_type);
            $('#status').val(data.status);
             $('#cur_datetime').val(data.cur_datetime);


            $('#id').val(data.id);


            setTimeout(function () {
               $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
               $('#message').html('');
            }, 5000);

         }
      });



   });

   
   $(document).on('click', '.check', function (e) {

      var user_id = $(this).data('id');
     alert(user_id)
      var checkBox = document.getElementsByClassName("check");

      if (confirm("Are you sure you want to update the data?")) {
         $.ajax({
            url: "http://localhost:3000/customEmp/action",
            method: "POST",
            data: {
               action: 'check',
               p_id: user_id
            },
            dataType: "JSON",
            success: function (data) {
               //   $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

               console.log("data" + data);
               
               if (data.success) {
                  $('#msgshow').show();
                  $(e.target).hide();


                  dataTable.row($(this).attr('data-rowid')).invalidate().draw();



               } else {
                  $('.check').show();
               }

               $('#tdata').DataTable().ajax.reload();
               setTimeout(function () {
                  $('#message').html('');
               }, 1000);

            }
         });
      }

   });




});

$(document).on('click', '#my_id', function (e) {

   var user_id = $(this).data('id');
   if (e.target.checked) {
      console.log("checked" + e.target.checked);

   } else {
      alert('hello');

   }


   $.ajax({
      url: "http://localhost:3000/customEmp/action",
      method: "POST",
      data: {
         action: 'add',
         p_id: user_id
      },
      dataType: "JSON",
      success: function (data) {
         //   $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();



         console.log("inserted" + data);
         console.log("camp_name" + data['camp_name']);
         $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();


         // $('.check').hide();
         // }else if(data.message == 'inserted'){
         //   alert("inserted");


         $('#tdata').DataTable().ajax.reload();
         setTimeout(function () {
            $('#message').html('');
         }, 1000);

      }
   });


})










