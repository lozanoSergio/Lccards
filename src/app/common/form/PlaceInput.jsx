import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import Script from "react-load-script";
import PlacesAutocomplete from "react-places-autocomplete";

class PlaceInput extends Component {
  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  handleChange = address => {
    this.setState({ address });
  };

  componentWillReceiveProps(nextProps){
    const input = nextProps.input
    this.setState({address: input.value})
  }

  render() {
    const {
      input,
      placeholder,
      width,
      onSelect,
      options,
      meta: { touched, error }
    } = this.props;

    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={onSelect}
            searchOptions={options}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: placeholder,
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
