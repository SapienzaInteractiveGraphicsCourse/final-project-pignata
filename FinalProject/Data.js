const c = Math.PI/180;
const r = 10.56;            //Planet Radius; 

export const Data = {
    'Astronaut': {
        animations: {
            'Reset': {
                joints: ['radius', 'root', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],

                frames: [
                    [{y: r}],
                    [{y: 0}],
                    [{x: 10*c}],
                    [{y: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0, y: 0}],
                    [{x: 0, y: 0}]
                 ],

                periods: [500],
                repeat: false,
                delay: false,
                reset: false,
            },
            'Walk': { // Walking Animation (with Gravity)
                joints: ['radius', 'Core', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {y: '+0.3'}, {y: '+0.3'}, {y: '-0.3'}, {y: '-0.3'},       {y: '+0.3'}, {y: '+0.3'}, {y: '-0.3'}, {y: '-0.3'}],        // Height
                    [{x: 15*c}, {x: 15*c}],                                                                                                  // Core

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],                      // rightHip
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],                          // rightKnee
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],                       // rightAnkle

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],                      // leftHip
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],                      // leftKnee
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],                         // leftAnkle

                    [ {x: -45*c}, {x: -15*c}, {x: 15*c}, {x: 45*c},     {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c} ],                      // rightShoulder
                    [ {x: -90*c}, {x: -90*c}, {x: -75*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],                   // rightElbow

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 45*c} ],                      // leftShoulder
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],                   // leftElbow
                ],
                periods: [200, 400, 400, 200, 200, 400, 400, 200],
                repeat: false,
                delay: false,
                reset: true,

            },

            'nWalk': {  // Walk Animation With NO Gravity. (TODO: Diminuire il movimento delle braccia, viceversa implementare running ed inclinare leggermente il Torso in avanti)
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {radius: r - 0.1 }, {radius: r - 0.05}, {radius: r}, {radius: r+0.05},       {radius: r - 0.1}, {radius: r-0.05}, {radius: r}, {radius: r+0.05}],       // Height

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightHip
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightKnee
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightAnkle

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftHip
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftKnee
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftAnkle

                    [ {x: -45*c}, {x: -15*c}, {x: 15*c}, {x: 45*c},     {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c} ],       // rightShoulder
                    [ {x: -90*c}, {x: -90*c}, {x: -75*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightElbow

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 45*c} ],     // leftShoulder
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],   // leftElbow
                ],
                periods: new Array(8).fill(200),
                repeat: true,
                delay: false,
                reset: true,
            },
            'Run': {  // Walk Animation With NO Gravity.
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow', 'Core'],
                frames : [
                    [ {radius: r - 0.1 }, {radius: r - 0.05}, {radius: r}, {radius: r+0.05},       {radius: r - 0.1}, {radius: r-0.05}, {radius: r}, {radius: r+0.05}],       // Height

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightHip
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightKnee
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightAnkle

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftHip
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftKnee
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftAnkle

                    [ {x: -45*c}, {x: -15*c}, {x: 15*c}, {x: 45*c},     {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c} ],      // rightShoulder
                    [ {x: -90*c}, {x: -90*c}, {x: -75*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightElbow

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 45*c} ],      // leftShoulder
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],   // leftElbow

                    [{x: 15*c}, {x: 15*c}]                                                                                  // Core
                ],
                periods: new Array(8).fill(100),
                repeat: true,
                delay: false,
                reset: true,
            },

            'nJump': {   // Jump with NO gravity
                joints: ['radius', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames: [
                    [{y: '-0.16'}, {y: '+0.16'}, {y: '+2'}, {y: '-2.16'}],
                    [{x: 25*c}, {x: 10*c}, {x: 0}, {x: 25*c}],
                    [{x: -15*c}, {x: 0}, {x: -10*c},{x: -15*c}],

                    [{x: -55*c}, {x: 15*c}, {x: 0},{x: -55*c}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c},{x: 80*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0},{y: 25*c}],

                    [{x: -55*c}, {x: 15*c}, {x: 0},{x: -55*c}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c},{x: 80*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0},{y: 25*c}],

                    [{x: -30*c}, {x: -90*c}, {x: -150*c},{x: -30*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -30*c}, {x: -90*c, y: -30*c}],

                    [{x: -30*c}, {x: -90*c}, {x: -120*c}, {x: -30*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -45*c}, {x: -90*c, y: -30*c},]
                ],
                periods: [200, 200, 400, 500],
                repeat: false,
                delay: [false, 50, false, 50],
                reset: true,

            },

            'Jump': {   // Jump with gravity
                joints: ['radius', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames: [
                    [{y: '-0.2'}, {y: '+0.2'}, {y: '+3'}, {y: '-0.2'}, {y: '-3'}],
                    [{x: 25*c}, {x: 10*c}, {x: 0}, {x: 10*c}, {x: 25*c}],
                    [{x: -15*c}, {x: 0}, {x: -10*c},{x: 0}, {x: -15*c}],

                    [{x: -55*c}, {x: 15*c}, {x: 0}, {x: 15*c}, {x: -55*c}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c}, {x: -15*c}, {x: 80*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0}, {y: -30*c}, {y: 25*c}],

                    [{x: -55*c}, {x: 15*c}, {x: 0}, {x: 15*c}, {x: -55*c}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c}, {x: -15*c}, {x: 80*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0}, {y: -30*c}, {y: 25*c}],

                    [{x: -30*c}, {x: -90*c}, {x: -150*c}, {x: -90*c}, {x: -30*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -30*c}, {x: -60*c, y: 0}, {x: -90*c, y: -30*c}],

                    [{x: -30*c}, {x: -90*c}, {x: -120*c}, {x: -90*c}, {x: -30*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -45*c}, {x: -60*c, y: 0}, {x: -90*c, y: -30*c},]
                ],
                periods: [200, 200, 1000, 400, 1000],
                repeat: false,
                delay: [false, 50, false, 100, false],
                reset: true,

            },
            'TurnRight': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                frames: [[{y: '-0.0'}],[{x: '-0.6'}],[{x: '-0.6'}],[{y: '-0.4'}]],
                periods: [200],
                reset: false,
            },
            'TurnLeft': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                frames: [[{y: '+0.0'}],[{x: '+0.6'}],[{x: '+0.6'}],[{y: '+0.4'}]],
                periods: [200],
                reset: false,
            },
            'TurnBack': {
                joints: ['Astronaut'],
                frames: [[{y: '+3.1415'}]],
                periods: [400],
                delay: false,
                reset: false,
            }
        }
    },
    'SpaceShip': {
        animations: {
            'Boarding': {
                joints: ['leg1', 'leg2', 'leg3','leg4'],
                frames: [[{x:  0.3, y: 0.8, z:  0.3}],[{x: -0.3, y: 0.8, z: -0.3}],[{x:  0.3, y: 0.8, z: -0.3}], [{x: -0.3, y: 0.8, z:  0.3}]],
                periods: [300],
                repeat: false,
                delay: false,
                reset: false,
            },
        }
    }

}
/*
    MODIFIED Structure:
    Name: [
        [
            {
                joint: 'jointName',
                to: {variable: value},
                period: t
            }
        ]
    ]

*/