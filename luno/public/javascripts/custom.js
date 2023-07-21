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
$(document).ready(function() { //  code for fetch Data //

    var dataTable = $('#table_data').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        'ajax': {
            'url': 'http://localhost:3000/newUser/get_data',

        },

        'aaSorting': [],
        'columns': [

            {
                data: 'first_name',
            },
            {
                data: 'last_name'
            },
            {
                data: 'email'
            },
            {
                data: 'phone'
            },
            {
                data: 'user_name'
            },
            // {
            //     data: 'date'
            // },
            {
                data: 'role'
            },

            // {
            //     data: 'date'
            // },

            {
                data: 'user_id'
            },


        ],

        columnDefs: [{
                targets: 6,
                orderable: false,
                render: function(data) {
                    return `
                  
                <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" ` + data + ` "><i class="fa fa-trash" style = "font-size:17px; color:black;"></i></button>
                <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" ` + data + ` "><i class="bi bi-pencil-square" style = "font-size:17px; color:black;"></i></button>
                <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" ` + data + ` "><i class='fas fa-eye' style='font-size:17px; color: black;'></i></button>
                    
                    `;
                }
            }


        ]


    }); // end code for fetch data //



    // $(document).ready(function(){
               
    //     $(".sample_data").children('td').css("background", "red");
    // });





    $('#add_data').click(function() { // start code  for insert the Data //

        $('#dynamic_modal_title').text('Add Data');
        ``
        $('#sample_form')[0].reset();

        var add = $('#action').val('Add');

        $('#action_button').text('Add Form');

        $('#action_modal').modal('show');

        if(add.val() == 'Add'){
            
            $('#dynamic_modal_title').text('Add Data').css({"font-size": "26px","font-weight": "bold"})
            $(".form-label").css({"color": "black"});
           
            $("input[type = 'text']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("input[type = 'email']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("select[name = 'role']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("input[type = 'password']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });

    
         }else{
            $('#action_modal').modal('hide');
         }
    


    });

    //  var isVal = true;
    $('#sample_form').on('submit', function(event) {


        event.preventDefault();
        if (flage == 0) {
            document.getElementById('password_err').innerHTML = "confirm password does not matched !";
            return;
        }




        $.ajax({
            url: "http://localhost:3000/newUser/action",
            method: "POST",
            data: $('#sample_form').serialize(),
            dataType: "JSON",
            beforeSend: function() {
                $('#action_button').attr('disabled', 'disabled');
            },
            success: function(data) {

                $('#action_button').attr('disabled', false);
                $('#action_modal').modal('hide');
                $('#table_data').DataTable().ajax.reload();
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();



                setTimeout(function() {
                    $('#message').html('');
                }, 2000);

            }

        }); // end code for insert data //


        // } else{
        //       $('#password_err').html('<p class="text-danger">***Password did not Match !</p>');

        //       var pw1 = $("input[name='password']").val('');  
        //       var pw2 = $("input[name='cnf_password']").val('');  
        //    }

    });


    $(document).on('click', '.edit', function() { //  start code for edit data //

        var ReadAll = $(".readAll").prop("readonly", false); // readable  code //

        var user_id = $(this).data('id');
        var text = $('#dynamic_modal_title').text('Edit Data');
        var edit = $('#action').val('Edit');
       var btn =  $('#action_button').text('Edit');
        $('#action_modal').modal('show');

        if(btn.text() == 'Edit'){
          
            $('#action_button').text('Edit').show();
        }else{
            $('#action_button').text('view').hide();
        }




        if (text.text() == 'Edit Data') {
            $('#dynamic_modal_title').text('Edit Data').css({
                "font-size": "26px",
                "font-weight": "bold"
            })

        }


        if (edit.val() == 'Edit') {

            $(".form-label").css({
                "color": "black"
            });
            $("input[type = 'text']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("input[type = 'email']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("select[name = 'role']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            $("input[type = 'password']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });

        } else {

            $(".form-label").css({
                "color": "Red"
            });
            $("input[type = 'text']").css({
                "border": "none;"
            });
            $("input[type = 'email']").css({
                "border": "none;"
            });
            $("select[name = 'role']").css({
                "border": "none;"
            });
            $("input[type = 'text']").css({
                "border": "none;"
            });


        }

        if (edit.val()) { //
            $(".readAll").prop("readonly", false);
        }

        $.ajax({
            url: "http://localhost:3000/newUser/action",
            method: "POST",
            data: {
                user_id: user_id,
                action: 'fetch_single'
            },

            dataType: "JSON",
            success: function(data) {
                $('#first_name').val(data.first_name);
                $('#last_name').val(data.last_name);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                $('#user_name').val(data.user_name);
                $('#password').val(data.password);
                $('#cnf_password').val(data.cnf_password);
                $('#role').val(data.role);
                // $('#date').val(data.date);
                $('#user_id').val(data.user_id);
                $('#table_data').DataTable().ajax.reload();

            }
        });

    }); // end code for edit data //

    $(document).on('click', '.view', function() { //  start code for view data //

        // var date = $('#date').val();
      

        var ReadAll = $(".readAll").prop("readonly", false);


        var user_id = $(this).data('id');
        var text = $('#dynamic_modal_title').text('View Data');
        var all = $('#action').val('view');    
        var btn =  $('#action_button').text('View Data');
                   $('#action_modal').modal('show');


        if(btn.text() == 'View Data'){

            // var newDate = $('#date').val();
            // alert(newDate);
            // var date = $('#date').show();
            // console.log(date.toString()); 
            
            // var mysqlDate = '2023-06-01T18:30:00.000Z';
            // var date = new Date(newDate);
            // console.log(date);
            // var formattedDate = date.toLocaleDateString('en-US', { timeZone: 'UTC' });

            // console.log({formattedDate}); // Output: 2023-06-01
     
            $('#action_button').text('View Data').hide();
        }else{
            $('#action_button').text('Edit').show();
        }
        


        if (text.text() == 'View Data') {
            $('#dynamic_modal_title').text('View Data').css({
                "font-size": "26px",
                "font-weight": "bold"
            })

        }

        if (all.val() == 'view') {

           

            $(".form-label").css({
                "color": "red"
            });
            $("input[type = 'text']").css({
                "border": "none"
            });
            $("input[type = 'email']").css({
                "border": "none"
            });
            $("select[name = 'role']").css({
                "border": "none"
            });
            $("input[type = 'password']").css({
                "border": "none"
            });


        } else {
            $(".form-label").css({
                "color": "black"
            });
          $('#date').hide();


        }

        if (all.val()) {
            $(".readAll").prop("readonly", true);
        }
        $.ajax({
            url: "http://localhost:3000/newUser/action",
            method: "POST",
            data: {
                user_id: user_id,
                action: 'fetch_single'
            },

            dataType: "JSON",
            success: function(data) {
                $('#first_name').val(data.first_name);
                $('#last_name').val(data.last_name);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                $('#user_name').val(data.user_name);
                $('#password').val(data.password);
                $('#cnf_password').val(data.cnf_password);
                $('#role').val(data.role);
                // $('#date').val(data.date);
                $('#user_id').val(data.user_id);
                $('#table_data').DataTable().ajax.reload();

            }
        });

    }); // end code for view data //




    $(document).on('click', '.delete', function() { //satart code for delete data //

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
                success: function(data) {
                    $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                    $('#table_data').DataTable().ajax.reload();
                    setTimeout(function() {
                        $('#message').html('');
                    }, 2000);

                }
            });
        }

    });




}); // end code //