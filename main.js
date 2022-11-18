let pro = document.querySelector('#pro');


class DOM{
	static getById(id){
		return document.getElementById(id);
	}
	static getClasses(className){
		return document.getElementsByClassName(className);
	}
	static getClass(className){
		return document.querySelector('.' + className);
	}
	static getTagNames(tagName){
		return document.getElementsByTagName(tagName);
	}
	static getTagName(tagName){
		return document.querySelector(tagName);
	}
}

class Helper{
	static sort(url1,url2){
		if (Number(url1.quality) > Number(url2.quality)) return -1;
		if (Number(url1.quality) == Number(url2.quality)) return 0;
		if (Number(url1.quality) < Number(url2.quality)) return 1;
	}
}


window.addEventListener('load',function () {
	let sendBtn = DOM.getTagName('button');
	sendBtn.onclick = () => {
		event.preventDefault();
		let input = DOM.getTagName('input'),
			form = DOM.getTagName('form'),
			URL = input.value.toLowerCase().trim(),
			errorField = DOM.getClass('errorField'),
			errorP = errorField.querySelector('p');
		sendBtn.innerHTML = `<span class="loader1"></span>`;
			pro.innerHTML = `<span class="loader"></span>`;

		// loader start...
		sendBtn.setAttribute('disabled','true');
		errorField.style.display = 'none';
		if (!URL) {
			errorField.style.display = 'block';
			errorP.innerText = "Iltimos Nimadur Kiriting...";
			sendBtn.innerHTML = 'Send';
			input.value = '';
			sendBtn.removeAttribute('disabled');
            pro.innerHTML = ``;
			// loader remove...
			return;
		}
		if (!URL.includes('youtube.com') && !URL.includes('youtu.be')) {
			errorField.style.display = 'block';
			errorP.innerText = "Iltimos Faqat Youtubeda Link Kiriting...";
			sendBtn.innerHTML = 'Send';
			input.value = '';
			sendBtn.removeAttribute('disabled');
            pro.innerHTML = ``;
			// loader remove...
			return;
		}
		fetch('https://api.onlinevideoconverter.pro/api/convert',{
			method: 'POST',
			body: new FormData(form)
		})
		.then((response)=> response.json())
		.then((result)=>{
			console.log(result.thumb)
			let urls = result.url;
			urls.sort(Helper.sort)
			console.log(urls);    
			sendBtn.innerHTML = 'Send';
			sendBtn.removeAttribute('disabled');
			errorField.style.display = 'none';
            pro.innerHTML = ``;

			// loader remove...
            urls.forEach(function(item){
               if(item.no_audio == false && item.audio == false) {
					pro.innerHTML += `
						<div class="card text-center col-md-4 shadow-lg p-3 mb-5 bg-warning rounded" style="">
							<div class="card-header">
								<a href="${item.url}" target="blank">
									<img class="img-fluid" src="${result.thumb}" alt="">
								</a>
							</div>
							<div class="card-body">
								<span class="">${item.quality}px</span><br>
								<span class="title">${result.meta.title}</span><br>
								<a href="${item.url}" download target="blank" class="btn btn-danger">
									<span>Yuklab olish</span>
								</a>
							</div>
							<div class="card-footer text-muted">
								2 days ago
							</div>
						</div>  
            		`; 
			   	}
			}); 
		});
	}
});