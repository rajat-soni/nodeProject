    $(document).ready(function() { // for fetch Data //

        //     load_data();
 
       // function load_data() {
 
       var dataTable = $('#table_data').DataTable({
         'processing' : true,
         'serverSide' : true,
         'serverMethod' : 'get',
         'ajax' : {
             'url' : 'http://localhost:3000/sender/get_data',
             
         },
 
         'aaSorting' : [],
         'columns' : [
          
             { data : 'sender_name', },
               { data : 'sender_email' },
              { data : 'sender_id' }
            
             
         ],
 
         columnDefs: [
             {
                 targets: 2,
                 orderable: false,
                 render: function (data) {
                     return `
                       
                     <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id=" `+data+` "><i class="fa fa-trash text" style = "font-size:16px; color:black; "></i></button>
                     <button type="button" class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+data+` "><i class="bi bi-pencil-square text" style = "font-size:16px;color:black; "></i></button>
                     <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ data+ ` "><i class='fas fa-eye' style='font-size:16px;  color:black;'></i></button>    
                     `;
                        
                 }
             }
            
             
         ]
   
         
    });

    $('#add_data').click(function() { // for insert the Data //
        $('.readA').prop('readonly', false);
         $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

       var add =  $('#action').val('Add');
    

       var btn =  $('#action_button').text('Add');

        $('#action_modal').modal('show');

        if(add.val() == 'Add'){
            
            $('#dynamic_modal_title').text('Add Data').css({"font-size": "26px","font-weight": "bold"})
            $(".form-label").css({"color": "black"});
           
            $("input[type = 'text']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
            $("input[type = 'email']").css({'border': '1px solid #B2BABB' , 'border-radius': '0%'});
            $("select[name = 'client_id']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
            $("input[type = 'text']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
    
         }else{
            $('#action_modal').modal('hide');
         }

         if(btn.text() == 'Add'){
     
            $('#action_button').text('Add').show();
            $('[name]').prop('require', true);
         }
    

    });

    $('#sample_form').on('submit', function(event) {

        event.preventDefault();
      
        senderFormValidationCheck();
        clientIdValidationCheck();
        $.ajax({
            url: "http://localhost:3000/sender/action",
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
        
                $('#table_data').DataTable().ajax.reload();
                $('#action_modal').modal('hide');

              

                setTimeout(function() {
                    $('#message').html('');
                }, 2000);
               
            }
        });

    });

    $(document).on('click', '.edit', function() { // for edit data //
        $('.readA').prop('readonly', false);
    var sender_id = $(this).data('id');
    
    
    var text = $('#dynamic_modal_title').text('Edit Data');
    
    var val = $('#action').val('Edit');
    
    var btn =   $('#action_button').text('Edit');
    
     $('#action_modal').modal('show');

    if(btn.text() == 'Edit'){
          
        $('#action_button').text('Edit').show();
    }else{
        $('#action_button').text('view').hide();
    }


  
    
    if(text.text() ==  'Edit Data' ){
        $('#dynamic_modal_title').text('Edit Data').css({"font-size": "26px","font-weight": "bold"})
     }
    
    var text = $('#dynamic_modal_title').text('Edit Data');
    if(val.val() == 'Edit') {
        $(".form-label").css({"color": "black"});
       
        $("input[type = 'text']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
        $("input[type = 'email']").css({'border': '1px solid #B2BABB' , 'border-radius': '0%'});
        $("select[name = 'client_id']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
        $("input[type = 'text']").css({'border': '1px solid #B2BABB', 'border-radius': '0%'});
    
    }else{
        
       
    }
    
    
    
    $.ajax({
        url: "http://localhost:3000/sender/action",
        method: "POST",
        data: {
            sender_id: sender_id,
            action: 'fetch_single'
        },
        dataType: "JSON",
        success: function(data)
    
        {
    
            $('#sender_name').val(data.sender_name);
            $('#sender_email').val(data.sender_email);
            $('#client_id').val(data.client_id);
            $('#sender_id').val(data.sender_id);
            $('#table_data').DataTable().ajax.reload();
                    
        }
    });
    
    });
    

    $(document).on('click', '.view', function() { // for edit data //
        $('.readA').prop('readonly', true);
        var sender_id = $(this).data('id');
        

        
        var text =   $('#dynamic_modal_title').text('View Data');
        
        
          var val = $('#action').val('view');
        
       var btn =  $('#action_button').text('view').hide();
        
        $('#action_modal').modal('show');
     
        if(btn.text() == 'view'){
     
            $('#action_button').text('view').hide();
        }else{
            $('#action_button').text('Edit').show();
           
        }

        if(text.text() ==  'View Data' ){
            $('#dynamic_modal_title').text('View Data').css({"font-size": "26px","font-weight": "bold"})
         }

        if(val.val() == 'view') {
            $(".form-label").css({"color": "red"});
         $("input[type = 'text']").css({"border": "none"});
         $("input[type = 'email']").css({"border": "none"});
         $("#client_id").css({"border": "none"});
         $('#table_data').DataTable().ajax.reload();
         }else{
           
            $(".form-label").css({"color": "black"});
            $("input[type = 'text']").css({"border": "1px solid #F5F5DC"});
            $("input[type = 'email']").css({"border": "1px solid #F5F5DC"});
            $("#client_id").css({"border": "1px solid #F5F5DC"});
            $("input[type = 'text']").css({"border": "1px solid #F5F5DC"});
        
         }
        
        $.ajax({
            url: "http://localhost:3000/sender/action",
            method: "POST",
            data: {
                sender_id: sender_id,
                action: 'fetch_single'
            },
            dataType: "JSON",
            success: function(data)
        
            {
        
                $('#sender_name').val(data.sender_name);
                $('#sender_email').val(data.sender_email);
                $('#client_id').val(data.client_id);
                $('#sender_id').val(data.sender_id);
                $('#table_data').DataTable().ajax.reload();
                        
            }
        });
        
        });



$(document).on('click', '.delete', function(){

var sender_id = $(this).data('id');

    if(confirm("Are you sure you want to delete this data?"))
    {
        $.ajax({
            url:"http://localhost:3000/sender/action",
            method:"POST",
            data:{action:'delete', sender_id:sender_id},
            dataType:"JSON",
            success:function(data)
            {
                $('#message').html('<div class="alert alert-success">'+data.message+'</div>').fadeIn();
                $('#table_data').DataTable().ajax.reload();
                
                setTimeout(function(){
                     $('#message').html('');
                }, 2000);
                
            }
        });
    }

});
});

