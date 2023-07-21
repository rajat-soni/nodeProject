
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
         { data: 'blast_type' },
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
              
               // var status = row.status;
               console.log("Status"+ row.status);
               console.log("allocated to"+ row.allocated_to);
               console.log("RB allocated To"+ row.rballocated_to);
               console.log("RB Status"+ row.rbstatus);
               console.log("Current date"+ row.todaydt);
               console.log("EB Current date time"+ row.eblast_datetime);

               dt1 = new Date(row.todaydt);
dt2 = new Date(row.eblast_datetime);
console.log(dt1);
console.log(dt2);



               return `
                  
               
               ${(row.status == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">Missed</span>`: `<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`} 



               
                 ${(row.allocated_to == row.rballocated_to && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.rballocated_to && row.rbstatus == 0 ) ? `<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title=""  data-id="`+row.id+`">`:` ` } 


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
      //var idtype = $(this).data('id');


      var blast_type = $('#blast_type').val();
      var blast_type1 = $('#blast_type1').val();
     
      console.log("blast type" +blast_type);

      console.log("View Data");
      $('.readAl').prop('readonly', true);
       

       if(blast_type == 'E-blast'){
         $('#blast_type').show();
         $('#blast_type1').hide();
       }else if(blast_type1 == 'E-blast/Reminder Blast'){
         $('#blast_type1').show();
         $('#blast_type').hide();
       }else{
         $('#blast_type').show();
       }

      var id = $(this).data('id');
      console.log("Click rb checkbox" +id);
  
      $('#dynamic_modal_title').text('View Data');

      $('#action').val('view');

      $('#action_button').text('').hide();

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
            $('#asset_link').val(data.asset_link);
            $('#blast_date').val(data.blast_date);
            $('#blast_time').val(data.blast_time);
            $('#tact').val(data.tact);
            $('#blast_type').val(data.blast_type);
            $('#blast_type1').val();
            
            $('#status').val(data.status);
            $('#id').val(data.id);


            // setTimeout(function () {
            //    $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
            //    $('#message').html('');
            // }, 5000);

         }
      });



   });

   
   $(document).on('click', '.check', function (e) {

      var user_id = $(this).data('id');
      
    
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
               $('.message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

               console.log("data" + data);
               
               if (data.success) {
                  $('.msgshow').show();
                  $('.remider_blst').show();
                  $('.check').hide();
                 


                  dataTable.row($(this).attr('data-rowid')).invalidate().draw();



               } else {
                  $('.check').show();
                  $('.remider_blst').hide();
                  $('.msgshow').hide();
               }

               $('#tdata').DataTable().ajax.reload();
               setTimeout(function () {
                  $('.message').html('');
               }, 1000);

            }
         });
      }

   });


});

$(document).on('click', '.remider_blstcheckbox', function (e) {
  
  
   var id = $(this).data('id');
   console.log("Click rb checkbox" +id);


  
    
      

      if (confirm("Are you sure you want to update the data?")) {
         $.ajax({
            url: "http://localhost:3000/customEmp/action",
            method: "POST",
            data: {
               action: 'remider_blstcheckbox',
               id: id
            },
            dataType: "JSON",
            success: function (data) {
               $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

               console.log("data" + data);
               
               if (data.success) {
                  $('.msgshow').show();
                  $(e.target).hide();


                  // dataTable.row($(this).attr('data-rowid')).clear().invalidate().draw();



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







