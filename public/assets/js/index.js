var voterButton = document.getElementById('registerVoter');
var errorDefined = false;

voterButton.addEventListener('click', function(){
    let errors = {};
    document.querySelectorAll("input").forEach(function(node){
        if(validation.ifEmpty(node.value)){
            errors[node.name] = "This field cannot be empty";
        }
    })
    var email = document.getElementsByName('email')[0].value;
    if(!validation.validateEmail(email) && !errors['email']){
        errors["email"] = 'Invalid Email Format';
    }
    if(Object.keys(errors).length == 0){
        
        swal({
            title: "Confirmation",
            type:"question",
            text:"Do you wish to register as a voter?",
            showCancelButton:true,
            preConfirm: ()=> {
                return new Promise((resolve) => {
                    $.ajax({
                        url:"/voter/save",
                        data:JSON.stringify({
                            firstname: $("#firstname").val(),
                            lastname: $("#lastname").val(),
                            email: $("#email").val()
                        }),
                        contentType: 'application/json',
                        method:"POST",
                        error: function(err){
                            console.log(err);
                        }
                    })
                    .done(function(data){
                        if(data.success)
                            console.log('Data saved');
                        else
                            console.log('Saved failed');
                        resolve();
                    })
                })
            },
            showLoaderOnConfirm:true,
            allowOutsideClick: () => !swal.isLoading()
        }).then(function(){
            swal({
                title:"Voter Registered!",
                text:"Go to the voting page!",
                type:"success",
                allowOutsideClick:false
            }).then( () => {
                window.location.href = '/vote'
            })
        })
    }
    else if(!errorDefined){
       validation.printErrors(errors);
    }
})


const validation = {
    validateEmail: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    ifEmpty: function(value){
        return !Boolean(value);
    },
    printErrors:function(errors){
        for(var prop in errors){
            var domElem = document.getElementsByName(prop)[0];
            var newElement = document.createElement('label');
            if(domElem.nextElementSibling.tagName !== "label" && domElem.nextElementSibling.className !== "error"){
                newElement.innerHTML = errors[prop];
                newElement.classList+='error';
                domElem.parentNode.insertBefore(newElement, domElem.nextSibling);
            }
        }
    },
    removeError:function(element){
        if(errorDefined)
            element.nextSibling.remove();
    }
}

// onkeypress user input is validated
document.querySelectorAll("input").forEach(function(node){
    node.addEventListener('keypress', function(keypressEvent){
        if(validation.ifEmpty(node.value)){
            validation.removeError(node);
        }
        if(node.name === "email" && validation.validateEmail(node.value)){
            validation.removeError(node);
        }
    })
});

