(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(e){if(e.ep)return;e.ep=!0;const l=s(e);fetch(e.href,l)}})();document.querySelector("#app").innerHTML=`
<div class="container py-2">
    <div class="col my-3">
      <div class="card border border-secondary rounded p-1">
        <div class="header-format col-md-12">
          <h1 class="first-heading">POST Data To Local Database by Local Server</h1>
        </div>
        <form class="card-body py-2">
          <div id="validation-alert-msg" class="alert alert-danger validation-msg" role="alert">
            You must fill out all the input feild..!
            <button type="button" class="close" id="close-alert-btn">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="user-name">Your Name</label>
              <input type="text" class="form-control text-capitalize" id="user-name">
              <small id="nameHelp" class="form-text text-muted">You must give your name.</small>
            </div>
            <div class="form-group col-md-6">
              <label for="user-email">Email address</label>
              <input type="email" class="form-control text-lowercase" id="user-email" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="px-3 py-1">
              <button type="submit" class="btn btn-info btn-post" id="btn-post">Add Data</button>
              <button type="submit" class="btn btn-primary btn-post-update ml-3" id="btn-post-update">Update
                Data</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col result-box mb-3">
      <div class="header header-format">
        <h1 class="border-bottom">Collected Data From Local Database</h1>
        <!-- <button class="btn btn-light my-1" id="btn-refresh">Refresh</button> -->
        <ul id="list" class="list"></ul>
      </div>
    </div>
  </div>
  `;let r="http://localhost:3000/products",f=document.getElementById("list"),m=document.getElementById("btn-post"),b=document.getElementById("btn-post-update"),u=document.getElementById("validation-alert-msg");document.getElementById("close-alert-btn");document.getElementById("select-accending-deccending");let d=document.getElementById("user-name"),o=document.getElementById("user-email"),p,E=t=>{t.forEach(a=>{let s=document.createElement("li");s.className="list-item",s.title=`${a.id} ${a.name}`,s.setAttribute("data-id",a.id),s.innerHTML=`
    <div class="data__section">
       <div class="data__id">
          <span class="heading">Id : </span><span id="data-id">${a.id}</span>
       </div>
       <div class="data__name">
          <span class="heading">Name : </span><span id="data-name">${a.name}</span>
       </div>
       <div class="data__email">
           <span class="heading">E-mail : </span><span id="data-email">${a.email}</span>
       </div>
    </div>
    <div class="data__action-btns"style="display:flex">
       <button title="Edit your data" class="btn btn-info px-3 mr-2" id="btn-edit">Edit</button>
       <button title="Delete your data" class="btn btn-danger px-2" id="btn-delete">Delete</button>
    </div>`,f.prepend(s)})},L=async function(t){let s=await(await fetch(t)).json();E(s)};m.addEventListener("click",function(t){t.preventDefault(),d.value.toLowerCase(),o.value.toLowerCase(),!d.value||!o.value?(clearTimeout(p),p=setTimeout(()=>{u.style.display="none"},5e3),u.style.display="block"):fetch(r,{method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({name:d.value,email:o.value})}).then(a=>a.json()).then(()=>location.reload())});f.addEventListener("click",t=>{t.preventDefault();const a=t.target.id=="btn-delete",s=t.target.id=="btn-edit";let n=t.target.parentElement.parentElement.dataset.id;if(a&&confirm("ARE YOU SURE TO DELETE THIS DATA.?")&&fetch(`${r}/${n}`,{method:"DELETE"}),s){let e=t.target.parentElement.parentElement.querySelector("#data-name").innerText,l=t.target.parentElement.parentElement.querySelector("#data-email").innerText;d.value=e,o.value=l,e.toLowerCase(),l.toLowerCase(),m.classList.add("disabled"),m.disabled="true",b.classList.add("show");const i=(c,y,v,h)=>{fetch(`${c}/${y}`,{method:"PATCH",body:JSON.stringify({name:v,email:h}),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(g=>g.json()).then(()=>location.reload())};b.addEventListener("click",function(c){c.preventDefault(),d.value&&o.value?i(r,n,d.value,o.value):i(r,n,e,l)})}});document.getElementById("close-alert-btn").addEventListener("click",t=>{t.preventDefault(),u.style.display="none",clearTimeout(p)});L(r);
