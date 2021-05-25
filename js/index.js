var questions = [
                    {"question":"Who is writer of 'Geet Govind'?", "answer":"JAYADEV", "hint":"Also Wrote 'Love Song of the Dark Lord'"},
                    {"question":"What is the state flower of Haryana?", "answer":"LOTUS", "hint":"Also known for 'Symbol of Purity'"},
                    {"question":"Smallest Ocean in the World?", "answer":"ARCTIC", "hint":"Experiences the extremes of Solar Radiation"},
                    {"question":"Country known as 'Land of the Midnight Sun'?", "answer":"NORWAY", "hint":"Also known for 'Magical Sky'"},
                    {"question":"Which is the largest coffee producing state of India?", "answer":"KARNATAKA", "hint":"Originally known as the State of Mysore"},
                    {"question":"Who Developed JavaScript?", "answer":"BRENDANEICH", "hint":"CEO of Brave Browser"}
                ]


var answer_selected, answer_selected_array = [], count = 0, question_no = 0, score=0, play_flag = false, player_name = "";
var ques_flag = true,question_no_array = [], score_array = [];


function play_button()
{
    var x = document.getElementById("form");
    var y = document.getElementById("game");
    var z = document.getElementById("topnav");
    var myobj = document.getElementById("outer");

    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }

    if (y.style.display === "none") 
    {
        y.style.display = "block";
    }

    if (z.style.display === "none") 
    {
        z.style.display = "block";
    }
    
    player_name = document.getElementById("name").value;

    if(!player_name)
    {
        player_name = "Noob";
    }

    myobj.remove();
    play_flag = true;
}


function question_select()
{
    if(question_no<5)
    {
        var new_answer_selected = "";
        question_no += 1;
        answer_selected_array = [];
        i = Math.floor(Math.random() * questions.length);
        question_selected = questions[i].question;
        answer_selected = questions[i].answer.split("");
        hint = questions[i].hint;
        
        count = answer_selected.length;

        for(i=0;i<answer_selected.length;i++)
        {
            answer_selected_array.push("_ ");
        }

        for(i=0;i<answer_selected_array.length;i++)
        {
            new_answer_selected += answer_selected_array[i];
        }
        
        document.getElementById("getname").innerHTML=player_name + ",";
        document.getElementById("counter").innerHTML=count;
        document.getElementById("ques_no").innerHTML=question_no;
        document.getElementById("ques").innerHTML=question_selected;
        document.getElementById("ans").innerHTML=new_answer_selected;
        document.getElementById("hints").innerHTML=hint;

        var elements = document.getElementsByClassName("keyboard_button");
        for(var i = 0; i < elements.length; i++)
        {
            elements[i].disabled = false;
            elements[i].style.cursor = "pointer";
        }
    }
    else
    {
        answer_selected_array = [];
        count = 0;
        document.getElementById("counter").innerHTML="";
        document.getElementById("ques").innerHTML="";
        document.getElementById("ans").innerHTML="";
        document.getElementById("ques_no").innerHTML="";
        document.getElementById("hints").innerHTML="";
    }

    var ques_score_str = "";
    for(i=0;i<question_no_array.length;i++)
    {   
        if(question_no_array[i]=="undefined")
        {
            continue;
        }
        else
        {
            ques_score_str += " <br/>Question: " + question_no_array[i] + "   Score: " + score_array[i] + "<br/>";
        }
    }
    document.getElementById("scoreboad_list").innerHTML=ques_score_str;
    document.getElementById("output1").innerHTML= "<br/>Total Score: " + score;
}


function key_press(id)
{
    var ques_score = 0;
    if(ques_flag)
    {
        if(count>0)
        {   
            var answer_selected_str = "", new_answer_selected = "";
            var key_pressed = document.getElementById(id).value;

            if(answer_selected.includes(key_pressed))
            {
                for(i=0;i<answer_selected.length;i++)
                {
                    if(answer_selected[i]==key_pressed)
                    {
                        answer_selected_array[i]=key_pressed;
                    }
                }

                document.getElementById(id).style.cursor = "not-allowed";
                document.getElementById(id).disabled = true;

                for(i=0;i<answer_selected.length;i++)
                {
                    answer_selected_str += answer_selected[i];
                }

                for(i=0;i<answer_selected_array.length;i++)
                {
                    new_answer_selected += answer_selected_array[i];
                }

                document.getElementById("ans").innerHTML=new_answer_selected;

                if(answer_selected_str==new_answer_selected)
                {
                    score += 20;
                    ques_score = 20;
                    alert(new_answer_selected + " is Correct");
                    question_no_array.push(question_no);
                    score_array.push(ques_score);
                    question_select();
                }
            }
            else
            {
                count -= 1;
                document.getElementById(id).style.cursor = "not-allowed";
                document.getElementById(id).disabled = true;
            }
            document.getElementById("counter").innerHTML=count;
        }
        else
        {
            alert("No Chance Left !!!");
            question_select();
        }

        if(count==0)
        {
            alert("No Chance Left !!!");
            question_no_array.push(question_no);
            score_array.push(ques_score);
            question_select();
        }

        if(question_no==5 && count==0)
        {
            ques_flag = false;
            document.getElementById("output").innerHTML= "Your Total Score: " + score + "<br/><br/><br/>";
            var elements = document.getElementsByClassName("keyboard_button");
            for(var i = 0; i < elements.length; i++)
            {
                elements[i].disabled = false;
                elements[i].style.cursor = "pointer";
            }
        }
    }
}