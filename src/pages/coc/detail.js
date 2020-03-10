import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default/detail'
import styles from './styles'


class CoC extends Component {
  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.title.main}>Code of Conduct</h1>
          <p style={styles.paragraph}>
            All attendees, speakers, sponsors and volunteers at BSidesNS
            are required to agree with the following code of conduct.
            Organizers will enforce this code throughout the event. We are
            expecting cooporation from all participants to help ensuring a safe
            and welcoming environment for everybody.
          </p>

          <h2 style={styles.title}>TL;DR</h2>
          <p style={styles.paragraph}>
            Be excellent to each other || GTFO!
          </p>
          <p style={styles.paragraph}>
            BSidesNS is dedicated to providing a harassment-free conference
            experience for everyone, regardless of skill, age, gender, sexual
            orientation, disability, physical appearance, body size, race, or
            religion. We do not tolerate harassment of conference participants
            in any form.
          </p>
          <p style={styles.paragraph}>
            Think about your speech and how it might affect/offend others
            around you. Offensive sexual language and imagery is not
            appropriate and entirely unprofessional for any conference venue,
            in partciular in workshops and talks. Conference participants
            (including sponsors, staff and volunteers) violating these rules
            may be sanctioned or expelled from the venue after deliberation
            by the organizers.
          </p>

          <h2 style={styles.title}>What is Harassment?</h2>
          <p style={styles.paragraph}>
            Harassment includes offensive verbal comments related to skill, age,
            gender, sexual orientation, disability, physical appearance, body
            size, race, religion, sexual images in public spaces, deliberate
            intimidation, stalking, following, harassing photography or
            recording, sustained disruption of talks or other events,
            inappropriate physical contact, and unwelcome sexual advances.
          </p>
          <p style={styles.paragraph}>
            Participants asked to stop any harassing behaviour are expected to
            comply immediately.
          </p>
          <p style={styles.paragraph}>
            Sponsors are also subject to the anti-harassment policy. In
            particular, sponsors must not use sexualised images, activities, or
            other material. Booth staff (including volunteers) should not use
            sexualised clothing/uniforms/costumes, or otherwise create a
            sexualised environment.
          </p>
          <p style={styles.paragraph}>
            If a participant engages in harassing behaviour, the conference
            organizers may take any action they deem appropriate, including
            warning the offender or expulsion from the conference.
          </p>
          <p style={styles.paragraph}>
            If you are being harassed, notice that someone else is being
            harassed, or have any other concerns, please contact a member of
            conference staff immediately.
          </p>
          <p style={styles.paragraph}>
            In case you need anything - Our team is happy to help you!
          </p>
          <p style={styles.paragraph}>
            Conference staff will be happy to help participants contact
            hotel/venue security or local law enforcement, provide escorts, or
            otherwise assist those experiencing harassment to feel safe for the
            duration of the conference. We value your attendance. We expect
            participants to follow these rules at conference and workshop
            venues, conference-related social events and social media.
          </p>
        </Paper>
      </Template>
    );
  }
}


export default CoC
