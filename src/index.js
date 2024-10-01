import './style.css'


export default class Dico {
  constructor({ data, config, api, block, readOnly }) {
    this.data = data;
    this.config = config;
    this.api = api;
    this.block = block;
    this.readOnly = readOnly;

    this.nodes = {
      wrapper: null,
    };

    this._data = null
    this._element;

    this._css = {
      block : this.api.styles.block,
      wrapper : 'ce-titre'
    }

    this._placeholder = "Entrez votre text";
  }

  static get toolbox() {
    return {
      title: 'Grand Titre',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="white"/><path d="M11 19.3172V5.8" stroke="black" stroke-width="1.5"/><path d="M14 14.0069L17 13.0414V19.8" stroke="black" stroke-width="1.5"/><path d="M6 7.73104V5.8H16V7.73104" stroke="black" stroke-width="1.5"/><path d="M13 19.3172H9" stroke="black" stroke-width="1.5"/></svg>'
    };
  }

  render(){
    const div = document.createElement('div')
    const content_2 = document.createElement('div')
    content_2.classList.add('ce-dico')
    div.classList.add('block-dico')
    const content = document.createElement('div')
    content.classList.add('ce-input-content')

    const input_link = document.createElement('input')
    input_link.type = 'text'
    input_link.placeholder = ''
    input_link.required = true
    const btn = document.createElement('button')
    btn.innerText = 'Recherche'


    content.appendChild(input_link)
    content.appendChild(btn)
    div.appendChild(content)

  

    btn.addEventListener('click', async () => {
      const value = input_link.value.toLocaleLowerCase()
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle></svg>`
      btn.disabled = true
      const apiUrl = `https://server.godigital.workers.dev/definition?expression=${value}`
    
      // Make a GET request using the Fetch API

      const powered = document.createElement('div')
      powered.classList.add('powered')
      powered.innerHTML = `<i><b>Powered by <a href = "https://fr.wiktionary.org/wiki/${value}">Wiktionary</a></b></i>`

      const request = await fetch(apiUrl)
      const response = await request.json()
      const { expression, definition } = response
      this._data = {...response, value}
      content_2.innerHTML = `<p style = "margin-top : 0">${expression}</p> <ol>${definition}</ol>`
      const ancre = content_2.querySelectorAll('a')
      content.style.display = 'none'
      ancre.forEach(a => {
        a.removeAttribute('href')
      })

      div.appendChild(content_2)
      const timeout = setTimeout(() => {
        div.appendChild(powered)
      }, 500)


      // clearTimeout(timeout)
    })

    if(this.data.hasOwnProperty('data')){
      content.style.display = 'none'
      const {expression, definition, value} = this.data.data
      content_2.innerHTML = `<p style = "margin-top : 0">${expression}</p> <ol>${definition}</ol> <div></div>`
      const ancre = content_2.querySelectorAll('a')
      content.style.display = 'none'
      ancre.forEach(a => {
        a.removeAttribute('href')
      })

      const powered = document.createElement('div')
      powered.classList.add('powered')
      powered.innerHTML = `<i><b>Powered by <a href = "https://fr.wiktionary.org/wiki/${value}">Wiktionary</a></b></i>`

      div.appendChild(content_2)
      const timeout = setTimeout(() => {
        div.appendChild(powered)
      }, 500)

      this._data = this.data
    }
    
    return div
  }

  save(){
    return {
      data : this._data
    }
  }
}