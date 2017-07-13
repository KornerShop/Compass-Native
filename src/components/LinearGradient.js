import React from 'react';
import { element } from 'prop-types';

import { LinearGradient } from 'expo';

const LinearGrad = props => (
    <LinearGradient
      colors={['#304352', '#d7d2cc']}
      style={{
        flex: 1,
        padding: 15,
      }}
    >
      {props.children}
    </LinearGradient>
  );

LinearGrad.propTypes = {
  children: element,
};

export default LinearGrad;
