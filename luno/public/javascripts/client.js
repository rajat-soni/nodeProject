$(document).ready(function() { // satart code  for fetch Data //

       //     load_data();

      // function load_data() {

      var dataTable = $('#customer_data').DataTable({
        'processing' : true,
        'serverSide' : true,
        'serverMethod' : 'get',
        'ajax' : {
            'url' : 'http://localhost:3000/client/get_data',
            
        },

        'aaSorting' : [],
        'columns' : [
         
            { data : 'client_name', },
            //   { data : 'client_email' },
             { data : 'client_id' }
           
            
        ],

        columnDefs: [
            {
                targets: 1,
                orderable: false,
                render: function (data) {
                    return `
                      
                    <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" `+data+` "><i class="fa fa-trash" style = "font-size:16px;  color:black;"></i></button>
                    <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+data+` "><i class="bi bi-pencil-square text" style = "font-size:16px; color:black; "></i></button>
                    <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ data+ ` "><i class='fas fa-eye text' style='font-size:16px; color:black; '></i></button>    
                        `;
                }
            }
           
            
        ]
  
        
      }); //end code for fetch data 

    

      

    // }


    //     $.ajax({
    //         url: "http://localhost:3000/client/action",
    //         method: "POST",
    //         data: {
    //             action : 'fetch'
    //         },
    //         dataType: "JSON",
    //         success: function(data) {
    //             var html = '';

    //             if (data.data.length > 0) {

    //                 for (var count = 0; count < data.data.length; count++) {
    //                     html += `;
    //                 <tr>
                   
    //                     <td>` + data.data[count].client_name + `</td>
    //                      <td>` + data.data[count].client_email + `</td>
                         
    //                     <td>


    //                     <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" ` + data.data[count].client_id + ` "><i class="fa fa-trash"></i></button>
    //                     <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+ data.data[count].client_id +` "><i class="fa fa-pencil"></i></button>
    //                     </td>
    //                     <tr>`;
                        
                        
                        
                    
    //                 }
    //             }

    //             $('.sample_data').html(html);
    //         }
    //     });
    // }



    


    $('#add_data').click(function() { //  start code  for  insert data //
        $('.readAl').prop('readonly', false)
        $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

       var add = $('#action').val('Add');

       var btn =  $('#action_button').text('Add');

        $('#action_modal').modal('show');

        if(add.val() == 'Add'){
            
            $('#dynamic_modal_title').text('Add Data').css({"font-size": "26px","font-weight": "bold"})
            $(".form-label").css({"color": "black"});
           
            $("input[type = 'text']").css({
                'border': '1px solid #B2BABB', 'border-radius': '0%'
            });
            
    
         }else{
            $('#action_modal').modal('hide');
         }

         if(btn.text() == 'Add'){


     
            $('#action_button').text('Add').show();
            $('[name]').prop('require', true);
         }

            
  

    });

    $('#sample_form').on('submit', function(event) {  // for client add data //

            event.preventDefault();

              var name = $('#client_name').val();
        // if(name != ""){
            
           
     
            $.ajax({
                url: "http://localhost:3000/client/action",
                method: "POST",
                data: $('#sample_form').serialize(),
                dataType: "JSON",
                beforeSend: function() {
                    $('#action_button').attr('disabled', 'disabled');
                },
                success: function(data)

                {

                    $('#action_button').attr('disabled', false);
                
                    $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                    $('#customer_data').DataTable().ajax.reload();
                    $('#action_modal').modal('hide');

                  

                    setTimeout(function() {
                        $('#message').html('');
                    }, 2000);
                    
                }
            });
        

       
        // }else{
        //     $('#message').html('<p class="alert alert-danger">Fields not be Empty. </p>').fadeIn()
        //     setTimeout(function() {
        //         $('#message').html('');
        //     }, 2000);
            
        // }    

    }); // end code for insert data //  


    $(document).on('click', '.edit', function() {  // start the edit code //
        $('.readAl').prop('readonly', false)
        var client_id = $(this).data('id');
        
        
       var title =  $('#dynamic_modal_title').text('Edit Data');
        
        var view = $('#action').val('Edit');
        
      var btn =   $('#action_button').text('Edit');
        
        $('#action_modal').modal('show');

        if(btn.text() == 'Edit'){
          
            $('#action_button').text('Edit').show();
        }else{
            $('#action_button').text('view').hide();
        }


          




        if(title.text() ==  'Edit Data' ){
            $('#dynamic_modal_title').text('Edit Data').css({"font-size": "26px","font-weight": "bold"})
         }

        if(view.val() == 'Edit') 
        {

            $(".form-label").css({"color": "black"});
            $("input[type = 'text']").css({'border': '1px solid #B2BABB','border-radius': '0%'});
            
          
            }
        
        
        $.ajax({
            url: "http://localhost:3000/client/action",
            method: "POST",
            data: {
                client_id: client_id,
                action: 'fetch_single'
            },
            dataType: "JSON",
            success: function(data)
           
        
            {
               
                $('#client_name').val(data.client_name);
                // $('#client_email').val(data.client_email);
                $('#client_id').val(data.client_id);
                $('#customer_data').DataTable().ajax.reload();
               
            }
        });
        
    }); // end the edit code //

    
    $(document).on('click', '.view', function() {  //start the view code //
        $('.readAl').prop('readonly', true)

       
        var client_id = $(this).data('id');
        
        
       var titleView =   $('#dynamic_modal_title').text('View Data');
        
        var view =  $('#action').val('View');    
       var btn = $('#action_button').text('View');
        $('#action_modal').modal('show');

        if(btn.text() == 'View'){
     
            $('#action_button').text('View').hide();
        }else{
            $('#action_button').text('Edit').show();
           
        }






        if(titleView.text() ==  'View Data' ){
            $('#dynamic_modal_title').text('View Data').css({"font-size": "26px","font-weight": "bold"})
         }
        
        if(view.val() == 'View') {
            
            $(".form-label").css({"color": "red"});
            $("input[type = 'text']").css({"border": "none"});
           
          
            }

        
        
        $.ajax({
            url: "http://localhost:3000/client/action",
            method: "POST",
            data: {
                client_id: client_id,
                action: 'fetch_single'
            },
            dataType: "JSON",
            success: function(data)
           
        
            {
               
                $('#client_name').val(data.client_name);
                // $('#client_email').val(data.client_email);
                $('#client_id').val(data.client_id);
                $('#customer_data').DataTable().ajax.reload();
               
            }
        });
        
    }); // end the view code //

        $(document).on('click', '.delete', function () {   // start the delete code //
 
            var client_id = $(this).data('id');
      
            if (confirm("Are you sure you want to delete this data?")) {
               $.ajax({
                  url: "http://localhost:3000/client/action",
                  method: "POST",
                  data: {
                     action: 'delete',
                     client_id: client_id
                  },
                  dataType: "JSON",
                  success: function (data) {
                     $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                     $('#customer_data').DataTable().ajax.reload();
                     setTimeout(function () {
                        $('#message').html('');
                     }, 2000);
                    
                  }
               });
            }
      
         }); // end the delte code //
});  // end the main document //


 