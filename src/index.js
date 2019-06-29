/**
 * Build styles
 */
require('./index.css').toString();

/**
 * CodeTool for Editor.js
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

class CodeTool {
  /**
   * Allow to press Enter inside the CodeTool textarea
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @typedef {Object} CodeData — plugin saved data
   * @param {String} code - previously saved plugin code
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {CodeData} data — previously saved plugin code
   * @param {Object} config - user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this.placeholder = config.placeholder || CodeTool.DEFAULT_PLACEHOLDER;

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: 'ce-code',
      textarea: 'ce-code__textarea'
    };

    this.nodes = {
      holder: null,
      textarea: null
    };

    this.data = {
      code: data.code || ''
    };

    this.nodes.holder = this.drawView();
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    let wrapper = document.createElement('div'),
      textarea = document.createElement('textarea');

    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
    textarea.classList.add(this.CSS.textarea, this.CSS.input);
    textarea.textContent = this.data.code;

    textarea.placeholder = this.placeholder;

    wrapper.appendChild(textarea);

    this.nodes.textarea = textarea;

    return wrapper;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement} this.nodes.holder - Code's wrapper
   * @public
   */
  render() {
    return this.nodes.holder;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} codeWrapper - CodeTool's wrapper, containing textarea with code
   * @returns {CodeData} - saved plugin code
   * @public
   */
  save(codeWrapper) {
    return {
      code: codeWrapper.querySelector('textarea').value
    };
  }

  /**
   * onPaste callback fired from Editor`s core
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const content = event.detail.data;
    this.data = {
      code: content.textContent
    };
  }

  /**
   * Returns Tool`s data from private property
   * @return {*}
   */
  get data() {
    return this._data;
  }

  /**
   * Set Tool`s data to private property and update view
   * @param {CodeData} data
   */
  set data(data) {
    this._data = data;

    if (this.nodes.textarea) {
      this.nodes.textarea.textContent = data.code;
    }
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.3189 4.91666L7.43555 16.8333L8.21888 17.4167L17.1022 5.5L16.3189 4.91666ZM17.763 8.13333L21.463 11.3333L17.763 14.5333L18.463 15.2333L22.863 11.3333L18.463 7.43333L17.763 8.13333ZM3.06667 11.3333L6.76667 14.5333L6.06667 15.2333L1.66667 11.3333L6.06667 7.43333L6.76667 8.13333L3.06667 11.3333Z" fill="#212132"/></svg>`,
      title: 'code'
    };
  }


  /**
   * Default placeholder for CodeTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return 'Enter code';
  }

  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle CODE tag.
   *
   * @static
   * @return {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: [ 'pre' ],
    };
  }
}

module.exports = CodeTool;
