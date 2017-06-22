import React, { Component } from 'react';
import { connect } from 'react-redux';

import { goalRef } from '../firebase';
import { setGoals } from '../actions';
import GoalItem from './GoalItem';

class GoalList extends Component {
  componentDidMount() {
    goalRef.on('value', (snap) => {
      const goals = [];
      snap.forEach((goal) => {
        const { email, title } = goal.val();
        goals.push({ email, title });
      });

      this.props.setGoals(goals);
    });
  }

  render() {
    return (
      <div>
        {
          this.props.goals.map((goal, index) => {
            const key = `key_${index}`;

            return (
              <GoalItem key={key} goal={goal} />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { goals } = state;

  return { goals };
};

export default connect(mapStateToProps, { setGoals })(GoalList);
