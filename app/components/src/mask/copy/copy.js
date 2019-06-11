import ClipboardJS from 'clipboard'
class CopyItem {
  text = ''
  error = null
  success = null
  dom = null
  clipboard = null
  successCallback = this.successCallback.bind(this)
  errorCallback = this.errorCallback.bind(this)
  constructor (dom) {
    this.dom = dom
  }
  setCopy (obj) {
    this.text = obj.text
    this.success = obj.success
    this.error = obj.error
    this.clipboard = new ClipboardJS(this.dom, {
      text: function () { return obj.text }
    })
    this.clipboard.on('success', this.successCallback)
    this.clipboard.on('error', this.errorCallback)

    this.dom && this.dom.dispatchEvent(new Event('click'))
  }
  destroy () {
    this.clipboard && this.clipboard.destroy()
  }
  successCallback () {
    const { text, success } = this
    success && success(text)
    this.destroy()
  }
  errorCallback () {
    const { text, error } = this
    error && error(text)
    this.destroy()
  }
}
export default CopyItem
