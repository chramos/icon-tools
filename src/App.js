import React from "react";

export default function App() {
  let iconMap = [];

  /**
   *
   * @param {String} string
   * @param {String} fileName
   */
  const prepareIconObject = (string, fileName) => {
    const svgTag = string.match(/<svg (.*?)>/).pop();
    const viewBox = svgTag.match(/viewBox="(.*?)"/).pop();
    const width = svgTag.match(/width="(.*?)"/).pop();
    const height = svgTag.match(/height="(.*?)"/).pop();

    const paths = [...string.matchAll(/<path (.*?)>/g)].map(pathTag =>
      pathTag
        .pop()
        .toString()
        .match(/d="(.*?)"/)
        .pop()
    );

    iconMap = [
      ...iconMap,
      { name: fileName.split(".")[0], paths, viewBox, width, height }
    ];

    const node = document.getElementById("result");
    node.innerHTML = JSON.stringify(iconMap);
    node.select();
    document.execCommand("copy");
  };

  const handleSubmit = () => {
    iconMap = [];
    const files = document.getElementById("file-input").files;

    for (var i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const fileName = files[i].name;
      reader.onload = () => prepareIconObject(reader.result, fileName);
      reader.readAsText(files[i]);
    }
  };
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input type="file" id="file-input" multiple />
        <input type="submit" />
      </form>
      <textarea
        id="result"
        style={{
          borderRadius: 4,
          borderColor: "grey",
          width: "100%",
          height: 300,
          marginTop: 20,
          fontSize: 14
        }}
      />
    </div>
  );
}
