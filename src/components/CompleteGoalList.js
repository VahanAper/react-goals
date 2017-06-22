import React, { Component } from 'react';
import { connect } from 'react-redux';

import { completeGoalRef } from '../firebase';
import { setCompleted } from '../actions';

class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on('value', (snap) => {
      const completedGoals = [];
      snap.forEach((completedGoal) => {
        const { email, title } = completedGoal.val();
        completedGoals.push({ email, title });
      });
      this.props.setCompleted(completedGoals);
    });
  }

  clearCompleted() {
    completeGoalRef.set([]);
  }

  render() {
    return (
      <div>
        {
          this.props.completeGoals.map((completedGoal, index) => {
            const { title, email } = completedGoal;
            const key = `key_${index}`;

            return (
              <div key={key}>
                <strong>{title}</strong>
                <span> completed by <em>{email}</em></span>
              </div>
            );
          })
        }
        <button
          className="btn btn-primary"
          onClick={() => this.clearCompleted()}
        >
          Clear All
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { completeGoals } = state;

  return {
    completeGoals,
  };
};

export default connect(mapStateToProps, { setCompleted })(CompleteGoalList);
