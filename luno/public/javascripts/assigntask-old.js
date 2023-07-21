$(document).ready(function () { // for fetch Data //

    //     load_data();

    // function load_data() {

    var dataTable = $('#table_data').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        'ajax': {
            'url': 'http://localhost:3000/assigntask/get_data',

        },


        'columns': [

            { data: 'camp_name', },
            { data: 'eblast_date', },
            { data: 'rblast_date', },

            { data: 'ebfname' },
            { data: 'status' },
            { data: 'id' }


        ],
        "aaSorting": [[1, "desc"]],
        columnDefs: [
            {
                targets: 5,
                orderable: false,
                render: function (data, type, row, meta) {
                    console.log("Datatable");
                    console.log("ID" + row.id);
                    console.log("blast_type" + row.blast_type);
                    return `
                   
                 <button type="button" hidden class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id =" `+ row.id + ' ' + row.blast_type + ` "><i class="fa fa-trash"></i></button>
                 
                 
                 <button type="button" hidden class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+ row.id + ' ' + row.blast_type + ` "><i class="fa fa-pencil"></i></button>

                 <button type="button" class="btn btn-link btn-sm view1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"  data-id =" `+ row.id + ' ' + row.blast_type + ` "><i class="fa fa-eye"></i></button>
                     
                 
              
 

                     `;
                }
            }


        ]


    });

    $('#add_data').click(function () { // for insert the Data //

        $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('#action_modal').modal('show');

    });

    $('#sample_form').on('submit', function (event) {

        event.preventDefault();

        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: $('#sample_form').serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $('#action_button').attr('disabled', 'disabled');
            },
            success: function (data) {

                $('#action_button').attr('disabled', false);
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

                $('#table_data').DataTable().ajax.reload();
                $('#action_modal').modal('hide');



                setTimeout(function () {
                    $('#message').html('');
                }, 1000);

            }
        });

    });


    $(document).on('click', '.edit', function () { // for edit data //
        $("#editdataa").show();
        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];








        $('#dynamic_modal_title').text('Edit Data');

        $('#action').val('Edit');

        $('#action_button').text('Edit');

        $('#action_modal').modal('show');

        var action = $("#action").val();
        console.log("Edit action Rajashri");
        console.log(action);
        if (action === "Edit") {
            console.log("If Edit condition is true");
            $("#viewdata11").hide();
            $("#editdataa").show();

        }
        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: {
                id: id,
                blast_type: blast_type,
                action: 'fetch_single'
            },
            dataType: "JSON",
            success: function (data) {
                if (blast_type == "Reminder-Blast") {
                    alert("Reminder Blast");

                    $('#camp_id').val(data.camp_name);
                    $('#blst_type').val(data.blast_type);
                    $('#user_id').val(data.user_id);
                    $('#id').val(data.id);
                    $('#table_data').DataTable().ajax.reload();
                }
                else {
                    alert("E - Blast");
                    $('#camp_id').val(data.camp_name);
                    $('#blst_type').val(data.blast_type);
                    $('#user_id').val(data.user_id);
                    $('#id').val(data.id);
                    $('#table_data').DataTable().ajax.reload();

                }


            }
        });

    });


    $('#view_data').click(function () {


        $('#dynamic_modal_title').text('View Data');

        $('#action').val('view1');

        $('#action_button').text('view1').hide();

        $('#action_modal').modal('show');

    });


    $(document).on('click', '.view1', function () {



        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];

        console.log("ID:" + id);
        console.log("Blast Type:" + blast_type);


        $('#dynamic_modal_title').text('View Data');

        $('#action').val('view1');

        $('#action_button').text('View').hide();
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

        if (blast_type === "Reminder-Blast") {

            $("#rbasset").show();
            $("#ebasset").hide();

        }

        else if (blast_type === "E-blast") {

            $("#rbasset").hide();
            $("#ebasset").show();

        }
        else {

        }

        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: { id: id, blast_type: blast_type, action: 'fetch_single_view' },

            dataType: "JSON",
            success: function (data) {
                console.log("Allocated TO EB:" + data.allocated_to);
                console.log("RB Allocated To RB:" + data.rballocated_to);
                if (data.allocated_to === data.rballocated_to) {
                    console.log("Allocated to and rb allocated to are same");
                    $("#rbasset").show();
                    $("#ebasset").show();
                }
                else {
                    $("#rbasset").show();
                    //$("#ebasset").show();
                }

                $('#cnameview').val(data.client_name);
                $('#camp_nameview').val(data.camp_name);
                $('#camp_fromview').val(data.camp_from);
                $('#blast_countview').val(data.blast_count);
                $('#commentview').val(data.comment);
                // $('#asset_name').val(data.asset_name);
                // $('#asset_link').val(data.asset_link);
                $('#rbfname').val(data.first_name);
                $('#rb_type').val(data.rb_type);
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
        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];


        if (confirm("Are you sure you want to delete this data?")) {
            $.ajax({
                url: "http://localhost:3000/assigntask/action",
                method: "POST",
                data: { action: 'delete', id: id, blast_type: blast_type },
                dataType: "JSON",
                success: function (data) {
                    $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                    $('#table_data').DataTable().ajax.reload();

                    setTimeout(function () {
                        $('#message').html('');
                    }, 3000);

                }
            });
        }

    });
});

