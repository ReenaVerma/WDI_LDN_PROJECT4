import React from 'react';
import ShowRoute from '../../components/routes/ShowRoute';
import Comments from '../../components/common/Comments';
import Footer from '../../components/common/Footer';
import '../../assets/scss/main.scss';

class IndividualUser extends React.Component {


  render() {
    console.log(this.props);
    return (
      <main>
        <section>
          <ShowRoute userId={this.props.match.params.id} />
          <Comments userId={this.props.match.params.id} />
        </section>
        <Footer />
      </main>
    );
  }
}

export default IndividualUser;
