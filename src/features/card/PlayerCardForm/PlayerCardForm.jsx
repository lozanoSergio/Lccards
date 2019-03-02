import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Image,
  Icon,
  Divider
} from "semantic-ui-react";
import { createCard } from "../cardActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import RadioInput from "../../../app/common/form/RadioInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import DateInput from "../../../app/common/form/DateInput";
import Dropzone from "react-dropzone";

const baseStyle = {
  width: 260,
  height: 206,
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

const mapState = (state, ownProps) => {
  let eventId = ownProps.match.params.id;
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    let events = state.firestore.ordered.events;
    event = events.filter(event => event.id === eventId);
    event = event[0];
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  };
};

const actions = {
  createCard
};

const teams = [
  { key: "g2esports", text: "G2 ESPORTS", value: "g2esports" },
  { key: "teamvitality", text: "TEAM VITALITY", value: "teamvitality" },
  { key: "splyce", text: "SPLYCE", value: "splyce" },
  { key: "schalke04", text: "SHALKE 04", value: "schalke04" },
  { key: "origen", text: "ORIGEN", value: "origen" },
  { key: "misfitsgaming", text: "MISFITS GAMING", value: "misfitsgaming" },
  { key: "skgaming", text: "SK GAMING", value: "skgaming" },
  { key: "fnatic", text: "FNATIC", value: "fnatic" },
  { key: "rogue", text: "ROGUE", value: "rogue" },
  { key: "excelesports", text: "EXCEL ESPORTS", value: "excelesports" }
];

const cardRarity = [
  { key: "common", text: "Common", value: "common" },
  { key: "rare", text: "Rare", value: "rare" },
  { key: "epic", text: "Epic", value: "epic" },
  { key: "legendary", text: "Legendary", value: "legendary" }
];

// const playerPosition = [
//   { key: "top", text: "Top", value: "top" },
//   { key: "jungler", text: "Jungler", value: "jungler" },
//   { key: "mid", text: "Mid", value: "mid" },
//   { key: "ad", text: "AD Carry", value: "adCarry" },
//   { key: "support", text: "Support", value: "support" }
// ];

const globalLeagues = [
  { key: "lec", text: "LEC", value: "lec" },
  { key: "lcs", text: "LCS", value: "lcs" },
  { key: "lck", text: "LCK", value: "lck" },
  { key: "lpl", text: "LPL", value: "lpl" },
  { key: "lms", text: "LMS", value: "lms" },
  { key: "wc", text: "WORLD CHAMPIONSHIP", value: "wc" },
  { key: "msi", text: "MID-SEASON INVITATIONAL", value: "msi" },
  { key: "ase", text: "ALL-STAR EVENT", value: "ase" },
  { key: "rr", text: "RIFT RIVALS", value: "rr" },
  { key: "em", text: "EUROPEAN MASTERS", value: "em" }
];

const validate = combineValidators({
  playerName: isRequired({ message: "Name of the player is required" }),
  nickname: isRequired({
    message: "Please provide the player league of legends nickname"
  }),
  team: isRequired({ message: "Select the player team" }),
  cardRarity: isRequired({ message: "Select the card rarity" })
});

class PlayerCardForm extends Component {
  state = {
    files: [],
    fileName: "",
    image: {},
    imageCheck: false
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  onFormSubmit = async values => {
    if (this.props.initialValues && this.props.initialValues.id) {
      await this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      let image = this.state.files[0];
      let imageName = this.state.imageName;
      this.props.createCard(values, image, imageName);
      this.props.history.push("/events");
    }
  };

  onDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      ),
      fileName: files[0].name,
      imageCheck: true
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
    const {
      invalid,
      submitting,
      pristine,
      event,
      loading
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Select League" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="globalLeague"
                type="text"
                component={SelectInput}
                options={globalLeagues}
                placeholder="Select League"
              />
              <Header sub color="teal" content="Player Details" />
              <Field
                name="playerName"
                type="text"
                component={TextInput}
                placeholder="Player name"
              />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["geocode"] }}
                placeholder="Player City"
                onSelect={this.handleCitySelect}
              />
              <Field
                name="birthday"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD"
                placeholder="Player Birthday"
                showMonthDropdown
                showYearDropdown
              />
              <Header sub color="teal" content="League of legends Details" />
              <Field
                name="nickname"
                type="text"
                component={TextInput}
                placeholder="Nickname"
              />
              <Field
                name="team"
                type="text"
                component={SelectInput}
                options={teams}
                placeholder="Player Team"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Player description"
              />
              <Form.Group inline name="role">
                <label>Role: </label>
                <Field
                  name="role"
                  alt="top"
                  label="/assets/icons/top_icon.png"
                  type="radio"
                  component={RadioInput}
                />
                <Field
                  name="role"
                  value="jungler"
                  alt="Jungler"
                  label="/assets/icons/jungle_icon.png"
                  type="radio"
                  component={RadioInput}
                />
                <Field
                  name="role"
                  value="mid"
                  alt="Mid"
                  label="/assets/icons/middle_icon.png"
                  type="radio"
                  component={RadioInput}
                />
                <Field
                  name="role"
                  value="adcarry"
                  alt="AD Carry"
                  label="/assets/icons/bottom_icon.png"
                  type="radio"
                  component={RadioInput}
                />
                <Field
                  name="role"
                  value="support"
                  alt="Support"
                  label="/assets/icons/support_icon.png"
                  type="radio"
                  component={RadioInput}
                />
              </Form.Group>

              <Header sub color="teal" content="Card Details" />
              <Field
                name="rarity"
                type="text"
                component={SelectInput}
                options={cardRarity}
                placeholder="Card Rarity"
              />

              <Divider />
              <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                  <Header color="teal" sub content="Add Image" />

                  <Dropzone
                    onDrop={this.onDrop}
                    multiple={false}
                    accept="image/*"
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragReject
                    }) => {
                      let styles = { ...baseStyle };
                      styles = isDragActive
                        ? { ...styles, ...activeStyle }
                        : styles;
                      styles = isDragReject
                        ? { ...styles, ...rejectStyle }
                        : styles;

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
                <Grid.Column width={2} />
                <Grid.Column width={2} />
                <Grid.Column width={4}>
                  <Header sub color="teal" content="Preview" />
                  {this.state.files[0] && (
                    <div>
                      <Image
                        style={{ minHeight: "206px", minWidth: "260px" }}
                        src={this.state.files[0].preview}
                      />
                    </div>
                  )}
                </Grid.Column>
              </Grid>

              <Divider />

              <Button
                loading={loading}
                disabled={
                  invalid || submitting || pristine || !this.state.imageCheck
                }
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                disabled={loading}
                onClick={this.props.history.goBack}
                type="button"
              >
                Cancel
              </Button>
              
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "cardForm", enableReinitialize: true, validate })(
      PlayerCardForm
    )
  )
);
