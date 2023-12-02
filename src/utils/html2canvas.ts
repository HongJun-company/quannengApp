import html2canvas from 'html2canvas'
export function savePhoto(poster: any) {
  html2canvas(poster, {
    logging: false,
    allowTaint: true,
    scale: window.devicePixelRatio,
    // width: shareContent.clientWidth, //dom 原始宽度
    // height: shareContent.clientHeight,
    scrollY: 0,
    scrollX: 0,
    useCORS: true,
    backgroundColor: '#ffffff'
  }).then(function (canvas) {
    // console.log(canvas);
    const imgUrl = canvas.toDataURL('image/png')
    const tempLink = document.createElement('a') // 创建一个a标签
    tempLink.style.display = 'none'
    tempLink.href = imgUrl
    tempLink.setAttribute('download', '1') // 给a标签添加下载属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink) // 将a标签添加到body当中
    tempLink.click() // 启动下载
    document.body.removeChild(tempLink) // 下载完毕删除a标签
    window.URL.revokeObjectURL(imgUrl)
  })
}

export function copyPhoto(poster: any) {
  html2canvas(poster, {
    logging: false,
    allowTaint: true,
    scale: window.devicePixelRatio,
    // width: shareContent.clientWidth, //dom 原始宽度
    // height: shareContent.clientHeight,
    scrollY: 0,
    scrollX: 0,
    useCORS: true,
    backgroundColor: '#ffffff'
  }).then(async (canvas) => {
    const imgUrl = canvas.toDataURL('image/png')
    const data = await fetch(imgUrl)
    const blob = await data.blob()

    await navigator.clipboard.write([
      // eslint-disable-next-line no-undef
      new ClipboardItem({
        [blob.type]: blob
      })
    ])

    ElMessage.success('复制成功')
  })
}
