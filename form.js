var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
            status.classList.add('success')
          status.innerHTML = "Le Message À Été Envoyer Avec Succès!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.classList.add('error')
              status.innerHTML = "Oops!<br>Il y a eu un Problème Lors de L'Envoi du Message"
            }
          })
        }
      }).catch(error => {
        status.classList.add('error')
        status.innerHTML = "Oops!<br>Il y a eu un Problème Lors de L'Envoi du Message"
      });
    }
    form.addEventListener("submit", handleSubmit)