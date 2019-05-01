import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Icon } from 'react-fa';
import { connect } from 'react-redux';
import { saveSettings } from '../../actions/actionCreator';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

class PersonalityTestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedLink: false,
      providedType: '',
      loading: false
    };
    this.savePersonalityType = this.savePersonalityType.bind(this);
  }

  savePersonalityType() {
    this.setState({ loading: true });
    this.props.saveSettings({ personalityType: this.state.providedType }).then(r => {
      this.setState({ loading: false });
      if (r.success) toast.success('Personality type saved');
    });
  }

  static typeToName(personalityType){
    switch (personalityType) {
      case 'INTJ-T':
      case 'INTJ-A':
        return 'Architect';
      case 'INTP-A':
      case 'INTP-T':
        return 'Logician';
      case 'ENTJ-A':
      case 'ENTJ-T':
        return 'Commander';
      case 'ENTP-A':
      case 'ENTP-T':
        return 'Debater';
      case 'INFJ-A':
      case 'INFJ-T':
        return 'Advocate';
      case 'INFP-A':
      case 'INFP-T':
        return 'Mediator';
      case 'ENFJ-A':
      case 'ENFJ-T':
        return 'Protagonist';
      case 'ENFP-A':
      case 'ENFP-T':
        return 'Campaigner';
      case 'ISTJ-A':
      case 'ISTJ-T':
        return 'Logistician';
      case 'ISFJ-A':
      case 'ISFJ-T':
        return 'Defender';
      case 'ESTJ-A':
      case 'ESTJ-T':
        return 'Executive';
      case 'ESFJ-A':
      case 'ESFJ-T':
        return 'Consul';
      case 'ISTP-A':
      case 'ISTP-T':
        return 'Virtuoso';
      case 'ISFP-A':
      case 'ISFP-T':
        return 'Adventurer';
      case 'ESTP-A':
      case 'ESTP-T':
        return 'Entrepreneur';
      case 'ESFP-A':
      case 'ESFP-T':
        return 'Entertainer';
      default:
        return 'Invalid type'

    }
  }

  render() {
    const { mode, personalityType } = this.props, { openedLink, providedType, loading } = this.state;
    return (
      <div>
        <div>
          Taking this quick 5 minute personality test will make sure we can match you with the
          best-fit {mode === 'mentor' ? 'mentee' : 'mentor'} who has a similar personality! It is
          quick and fun, just take the quiz and when you come back write your type here:
        </div>
        {personalityType ? <div>
          <Button variant={'success'}>✅ You're a {PersonalityTestButton.typeToName(personalityType)} ({personalityType})</Button>
          <Button variant={'danger'} onClick={() => this.props.saveSettings({personalityType:''})}><Icon name='fas fa-times'/></Button>
        </div> : <div>
          {openedLink ? <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Use format XXXX-X</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={providedType}
                             isValid={/(E|I)(N|S)(T|F)(J|P)-(A|T)/.test(providedType)}
                             isInvalid={!/(E|I)(N|S)(T|F)(J|P)-(A|T)/.test(providedType)}
                             onChange={(e => {
                               this.setState({ providedType: e.target.value });
                             })}/>
                <InputGroup.Append>

                  <Button onClick={this.savePersonalityType} disabled={!/(E|I)(N|S)(T|F)(J|P)-(A|T)/.test(providedType)}>
                    {loading ? <ReactLoading type={'spin'} color={'#111111'} height={24} width={24}/> : <span>
                     <Icon name='fas fa-send'/> Save</span>}
                  </Button>
                </InputGroup.Append>

                <FormControl.Feedback type={'invalid'}>
                  Type should be in format XXXX-X, e.g. ESTJ-T
                </FormControl.Feedback>

              </InputGroup>

            </div> :
            <Button
              disabled={personalityType}
              onClick={() => {
                this.setState({ openedLink: true });
                window.open('https://www.16personalities.com/free-personality-test', '_blank');
              }}>
              {personalityType ? '✅' : '🧪'} Take the 16Personalities Test</Button>}
        </div>}
      </div>
    );
  }
}

export default connect(null, dispatch => {
  return {
    saveSettings: (values) => dispatch(saveSettings(values))
  };
})(PersonalityTestButton);
