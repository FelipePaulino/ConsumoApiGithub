var github_usuarios = 'https://api.github.com/users/';
var repositorios = '/repos';
var repositorios_favoritos = '/starred';

$('#botao-pesquisar').click(function (e) {
    var usuario_digitado = $('#input-pesquisa').val();
    conexaoUsuario(usuario_digitado);
});

function conexaoUsuario(usuario_digitado) {
    $.ajax({
        url: github_usuarios + usuario_digitado,
        type: 'get',
		dataType: "json",
		success: function (data) {
			$('#card-usuarios div, #card-usuarios img, #card-usuarios button, #card-repositorios h3').remove();
			$('#card-repositorios div').remove();
		    $('#card-usuarios').append(
		    	
		    	"<div class='row m-0 p-3 border'><img class='foto-perfil col-md-3 p-0' src='" + data.avatar_url + "'/>" +
		    	"<div class='col-md-9'><div class='nome'><b>Nome:</b> " + data.login + "</div>" +
		    	"<div class='bio' ><b>Bio:</b> " + data.bio + "</div>" +
		    	"<div class='following'><b>following:</b>" + data.following + "</div>" +
		    	"<div class='followers'><b>followers:</b>" + data.followers + "</div></div>" +
		    	"<button class='btn-primary my-2 mr-2' onclick=conexaoRepositorios('" + (usuario_digitado) + "')>Repos</button>" +
		    	"<button class='btn-info my-2' onclick=conexaoRepositoriosFavoritos('" + (usuario_digitado) + "')>Starred</button></div>"
		    );
		},
        error: function () {
        	alert('Usuário não é Válido');
            
        }
    });
}

function conexaoRepositorios(usuario_digitado) {
	 $.ajax({
        url: github_usuarios + usuario_digitado + repositorios,
  		type: 'get',
		dataType: "json",
		success: function (data) {
			$('#card-repositorios div, #card-repositorios h3').remove();
			$('#card-repositorios').append("<h3 class='p-2'>Meus Repositórios</h3><div class='row m-0 titulos p-2'><div class='nome-autor p-0 col-md-3'>Autor</div>" +
				"<div class='nome-repositorio col-md-9 p-0'>Repositório</div></div>")
  			$(data).each(function(){
				console.log(this.name);
				$('#card-repositorios').append(
					"<div class='row m-0 '><div class='nome-autor col-md-3 p-2 border'><b>" + this.owner.login + "</b></div>" +
					"<div class='nome-repositorio col-md-9 p-2 border'>" + this.name + "</div>" 
				)
  			})
  				
  			
        },
        error: function () {
            alert('Repositorios não são válidos');
        }
    });
}

function conexaoRepositoriosFavoritos(usuario_digitado) {
	 $.ajax({
        url: github_usuarios + usuario_digitado + repositorios_favoritos,
  		type: 'get',
		dataType: "json",
		success: function (data) {
			$('#card-repositorios div, #card-repositorios h3').remove();
				$('#card-repositorios').append("<h3 class='p-2'>Repositórios Favoritados</h3><div class='row m-0 titulos p-2'><div class='nome-autor p-0 col-md-3'>Autor</div>" +
				"<div class='nome-repositorio col-md-9 p-0'>Repositório</div></div>")
  			$(data).each(function(){
				console.log(this.name);
				$('#card-repositorios').append(
					"<div class='row m-0 '><div class='nome-autor col-md-3 p-2 border'><b>" + this.owner.login + "</b></div>" +
					"<div class='nome-repositorio col-md-9 p-2 border'>" + this.name + "</div>" 
				)
  			})
  				
  			
        },
        error: function () {
            alert('Repositorios Favoritados não são válidos');
        }
    });
}