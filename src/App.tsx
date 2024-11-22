import "./App.css";
import { ActivityList } from "./data";
import domtoimage from "dom-to-image";

function App() {
  const exportImg = async () => {
    const svgString = await domtoimage.toSvg(document.body!, {
      bgcolor: "dark",
    });

    return new Promise((res) => {
      // 超采样倍率
      const scaleFactor = 3;
      // 创建 Canvas 元素
      const canvas = new OffscreenCanvas(
        document.body.clientWidth * scaleFactor,
        document.body.clientHeight * scaleFactor
      );
      const ctx = canvas.getContext("2d");
      ctx?.scale(scaleFactor, scaleFactor);
      // 创建图像对象
      const img = new Image();
      img.crossOrigin = "anonymous"; // 设置跨域
      console.log(svgString);
      img.onload = async () => {
        // 将图像绘制到 Canvas 上
        ctx!.drawImage(img!, 0, 0);
        const a = document.createElement("a"); // 创建 a 标签
        console.log(img.src);
        a.href = URL.createObjectURL(await canvas.convertToBlob()); // 设置图片的 URL
        a.download = "Arknights.png"; // 设置文件名
        document.body.appendChild(a); // 将 a 标签临时添加到 DOM
        a.click(); // 自动触发点击事件
        document.body.removeChild(a); // 移除 a 标签
        res(true);
      };

      img.onerror = () => {
        alert("下载失败");
      };

      // 加载 SVG 数据到图像对象
      img.src = svgString;
    });
  };
  return (
    <div>
      {ActivityList.map((item) => {
        return <img src={item.img}></img>;
      })}
      <div>
        <button onClick={exportImg}>导出</button>
      </div>
    </div>
  );
}

export default App;
