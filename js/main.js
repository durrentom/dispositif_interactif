var questions = new Array;
var player;
var totalQuestions;

function runApp(qId){

    $(".visible").hide().find('ul').empty();

    var cur = 0;
    for(i in questions){
        if(questions[i].id == qId){
            cur = questions[i];
            break;
        }
    }
    // cur = questions[qId]; // 0 1 3 4
    $q = $('.type'+cur.type+'');
    $('#questionLabel').html(cur.label);
    $a = $q.find('ul'); 
    
    for(i in cur.answers){
        if(cur.type == 2){
            $("<li class='width"+cur.answers.length+"'></li>").html("<img src='"+cur.answers[i].label+"'/>").appendTo($a);
        }
        else
            $("<li>"+cur.answers[i].label+"</li>").appendTo($a);
    }
    
    if(cur.hasImage == "true")
        $q.find('img').attr("src",cur.imageURL); 
    else    
        $q.addClass("noImage");


    $q.addClass("visible").show();

    $("li",$a).on('click',function(){

        var numQuestion = $(this).index();

        for (var i=0; i<4; ++i){ 
        //A modifier dans le cas ou la reponse determine la question suivante           
            player.coefs[i] += cur.answers[numQuestion].coefs[i] ;
            if (cur.id == totalQuestions)
                player.coefs[i] /= totalQuestions ;    
        }

        //console.log(player.coefs[0] + " " + player.coefs[1] + " " + player.coefs[2] + " " + player.coefs[3]);


        var next = cur.answers[numQuestion].nextQuestion;
        //changer l'url en fonction du serveur
        //var url = "http://172.20.10.10/DispInt/#"  + next;
        var url = "http://127.0.0.1/DispInt/#"  + next;
        window.location.href = url;

        

        runApp(next);
        // window.location.reload();
    })
    
}


$(document).ready(  function(){
    player = new Player();
	

	$.ajax( {
        type: "GET",
        url: "xml/datas.xml",
        dataType: "xml",        
        success: function(xml) {
        	
        	$(xml).find('question').each( 
        		function()
                {
                    var id = $(this).attr("id");
                    var type = $(this).attr("type");
                    var label = $(this).find("label").text();
                    var hasImage = $(this).attr("hasImg");
                    var imageURL = $(this).find("image").attr('value');

                    var answers = new Array;
                    $(this).find("response").each(
                    	function(){
                    		var id = $(this).attr("id");
		                    var nextQuestion = $(this).attr("nextQuestion");
		                    var label = $(this).find("content").text();

                            var coefs = Array();
                            $(this).find("coefs > coef").each(function(){
                                var coef = parseFloat( $(this).attr('value') );
                                coefs.push( coef );
                            });
                            var tempAnswer = new Answer(id,label,nextQuestion,coefs);
                            answers.push(tempAnswer);
                    	}
                    );


                    var tempQuestion = new Question(id,type,label,hasImage,imageURL,answers);
                    questions.push(tempQuestion);

                });
                totalQuestions = questions.length;                

                var id = window.location.hash.replace("#",'');
                if(id == 0 || id == '')
                    id = 1; 
                // console.log(id);
            	runApp(id);
        }
    }); 
    // $(window).on('hashchange',hashChange);
});     

function hashChange(){
    console.log('ON HASH CHANGE');
    window.location.reload();
}       
            
