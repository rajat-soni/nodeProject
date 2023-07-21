// $(document).ready(function () { // for fetch Data //

//     load_data();
 
//     function load_data() {
//        $.ajax({
//           url: "http://localhost:3000/newUser/action",
//           method: "POST",
//           data: {
//              action: 'fetch'
//           },
//           dataType: "JSON",
//           success: function (data) {
//              var html = '';
 
//              if (data.data.length > 0) {
//                 for (var count = 0; count < data.data.length; count++) {

//                 html += `
//                  <tr>
//                 <td>` + data.data[count].first_name + `</td>
//                 <td>` + data.data[count].last_name + `</td>
//                 <td>` + data.data[count].email + `</td>
//                 <td>` + data.data[count].phone + `</td>
//                 <td>` + data.data[count].user_name + `</td>
//                 <td>` + data.data[count].password + `</td>
//                 <td>` + data.data[count].cnf_password + `</td>
//                 <td>` + data.data[count].date + `</td>
                
                
                
//                <td>


//                <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" `+ data.data[count].user_id +` "><i class="fa fa-trash"></i></button>
//                <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+ data.data[count].user_id +` "><i class="fa fa-pencil"></i></button>
//                </td>
//                <tr>`;
               
 
//                 }
 
//              }
//              $('.sample_data').html(html);
//           }
//        });
//     }
 

$(document).ready(function() { // for fetch Data //

   //     load_data();

  // function load_data() {

  var dataTable = $('#table_data').DataTable({
    'processing' : true,
    'serverSide' : true,
    'serverMethod' : 'get',
    'ajax' : {
        'url' : 'http://localhost:3000/newUser/get_data',
        
    },

    'aaSorting' : [],
    'columns' : [
     
        { data : 'first_name', },
          { data : 'last_name' },
         { data : 'email' },
         { data : 'phone' },
         { data : 'user_name' },
         { data : 'date' },
         { data : 'user_id' },
        
        
    ],

    columnDefs: [
        {
            targets: 6,
            orderable: false,
            render: function (data) {
                return `
                  
                <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" `+data+` "><i class="fa fa-trash"></i></button>
                <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+data+` "><i class="fa fa-pencil"></i></button>
                    
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
            if(flage==0) { 
               document.getElementById('password_err').innerHTML = "confirm password does not matched !";
               return;
            }
           
            

         //    var pw1 = $("input[name='password']").val();  
         //   var pw2 = $("input[name='cnf_password']").val();  

      // if(pw1 === pw2)  
      // {   
      //    $('#password_err').html('<p class="text-danger">***Password did not Match !</p>').fadeOut(100);
         $.ajax({
            url: "http://localhost:3000/newUser/action",
            method: "POST",
            data: $('#sample_form').serialize(),
            dataType: "JSON",
            beforeSend: function () {
               $('#action_button').attr('disabled', 'disabled');
            },
            success: function (data){
              
               $('#action_button').attr('disabled', false);
               $('#action_modal').modal('hide');
               $('#table_data').DataTable().ajax.reload();
               $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
               
              
               
               setTimeout(function () {
                    $('#message').html('');
               }, 2000);
            
            }
            
         });
       

      // } else{
      //       $('#password_err').html('<p class="text-danger">***Password did not Match !</p>');
         
      //       var pw1 = $("input[name='password']").val('');  
      //       var pw2 = $("input[name='cnf_password']").val('');  
      //    }
 
    });
 
 
    $(document).on('click', '.edit', function () { // for edit data //
       var user_id = $(this).data('id');
       $('#dynamic_modal_title').text('Edit Data');
       $('#action').val('Edit');
       $('#action_button').text('Edit');
       $('#action_modal').modal('show');
 
 
       $.ajax({
          url: "http://localhost:3000/newUser/action",
          method: "POST",
          data: {
             user_id: user_id,
             action: 'fetch_single'
          },
          
          dataType: "JSON",
          success: function (data) {
             $('#first_name').val(data.first_name);
             $('#last_name').val(data.last_name);
             $('#email').val(data.email);
             $('#phone').val(data.phone);
             $('#user_name').val(data.user_name);
             $('#password').val(data.password);
             $('#cnf_password').val(data.cnf_password);
             $('#role').val(data.role);
             $('#user_id').val(data.user_id);
             $('#table_data').DataTable().ajax.reload();
 
          }
       });
 
    });
 
    $(document).on('click', '.delete', function () {
 
       var user_id = $(this).data('id');
 
       if (confirm("Are you sure you want to delete this data?")) {
          $.ajax({
             url: "http://localhost:3000/newUser/action",
             method: "POST",
             data: {
                action: 'delete',
                user_id: user_id
             },
             dataType: "JSON",
             success: function (data) {
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
               $('#table_data').DataTable().ajax.reload();
                setTimeout(function () {
                   $('#message').html('');
                }, 2000);
                
             }
          });
       }
 
    });
 });