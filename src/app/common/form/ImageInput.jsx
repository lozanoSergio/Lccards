import React, { Component } from "react";
import { Form, Grid, Header, Image, Icon } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: "#666",
  borderStyle: "dashed",
  borderRadius: 5,
  paddingTop: 30,
  textAlign: "center"
};
const activeStyle = {
  borderStyle: "solid",
  borderColor: "#6c6",
  backgroundColor: "#eee"
};
const rejectStyle = {
  borderStyle: "solid",
  borderColor: "#c66",
  backgroundColor: "#eee"
};

class ImageInput extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  onDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      ),
      fileName: files[0].name
    });
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  render() {
    const { input } = this.props;

    if (this.state.file !== null) {
      input.value = this.state.files;
    }

    return (
      <Form.Field>
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Add Image" />

            <Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject
              }) => {
                let styles = { ...baseStyle };
                styles = isDragActive ? { ...styles, ...activeStyle } : styles;
                styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

                return (
                  <div style={styles} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon name="upload" size="huge" />
                    <Header content="Drop image here or click to upload" />
                  </div>
                );
              }}
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Edit Image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: "100%" }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Preview" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: "200px", minWidth: "200px" }}
                  src={this.state.cropResult}
                />
              </div>
            )}
          </Grid.Column>
        </Grid>
      </Form.Field>
    );
  }
}

export default ImageInput;
