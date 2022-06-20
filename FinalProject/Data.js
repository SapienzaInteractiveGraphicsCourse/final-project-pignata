const c = Math.PI/180;
const r = 10.56;            //Planet Radius; 

export const Data = {
    'Astronaut': {
        animations: {
            'Reset': {
                joints: ['root', 'root', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
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
                delay: false,
                repeat: false,
                reset: false,
            },
            'Walk': { // Walking Animation (with Gravity)
                joints: ['root', 'Core', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
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
                delay: false,
                repeat: true,
                reset: true,

            },

            'nWalk': {  // Walk Animation With NO Gravity. (TODO: Diminuire il movimento delle braccia, viceversa implementare running ed inclinare leggermente il Torso in avanti)
                joints: ['root', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
                frames : [
                    [ {y: r - 0.1 }, {y: r - 0.05}, {y: r}, {y: r+0.05},       {y: r - 0.1}, {y: r-0.05}, {y: r}, {y: r+0.05}],       // Height

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
                delay: false,
                repeat: true,
                reset: true,
            },

            'Run': {  // Walk Animation With NO Gravity.
                joints: ['root', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow', 'Core'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
                frames : [
                    [ {y: r - 0.1 }, {y: r - 0.05}, {y: r}, {y: r+0.05},       {y: r - 0.1}, {y: r-0.05}, {y: r}, {y: r+0.05}],       // Height

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
                delay: false,
                repeat: true,
                reset: false,
            },

            'Jump': {   // Jump with NO gravity
                joints: ['root', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
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
                delay: [false, 50, false, 50],
                repeat: false,
                reset: true,

            },

            'nJump': {   // Jump with NO gravity
                joints: ['root', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
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
                periods: [200, 200, 800, 200, 800],
                delay: [false, 50, false, 100, false],
                repeat: false,
                reset: true,

            },
            'TurnRight': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                attributes: ['rotation', 'rotation', 'rotation', 'rotation'],
                frames: [[{y: '-0.0'}],[{x: '-0.6'}],[{x: '-0.6'}],[{y: '-0.4'}]],
                periods: [200],
                delay: false,
                repeat: false,
                reset: false,
            },
            'TurnLeft': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                attributes: ['rotation', 'rotation', 'rotation', 'rotation'],
                frames: [[{y: '+0.0'}],[{x: '+0.6'}],[{x: '+0.6'}],[{y: '+0.4'}]],
                periods: [200],
                delay: false,
                repeat: false,
                reset: false,
            },

            'TurnBack': {
                joints: ['Torso', 'Legs'],
                attributes: ['rotation', 'rotation'],
                frames: [
                    [{y: '+3.1415'}],
                    [{y: '+3.1415'}]
                ],
                delay: [0],
                periods: [500],
                repeat: false,
                reset: false,
            },
            'Boarding': {
                joints: ['Astronaut', 'root', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                attributes: ['rotation', 'position', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation', 'rotation'],
                frames: [
                    [{x: '+0'}, {x:'+0'}, {y: '+3'}],
                    [{y: '-0.2'}, {y: '+0.2'}],
                    [{x: 25*c}, {x: 10*c}, {x: 0}],
                    [{x: -15*c}, {x: 0}, {x: -10*c},],
                    [{x: -55*c}, {x: 15*c}],
                    [{x: 80*c}, {x: -15*c}],
                    [{y: 25*c}, {y: -30*c}],
                    [{x: -55*c}, {x: 15*c}],
                    [{x: 80*c}, {x: -15*c}],
                    [{y: 25*c}, {y: -30*c}],
                    [{x: -30*c}, {x: -90*c}],
                    [{x: -90*c, y: -30*c}],
                    [{x: -30*c}, {x: -90*c}],
                    [{x: -90*c, y: -30*c}],
                ],
                periods: [250, 200],
                delay: [false, 50],
                repeat: false,
                reset: false
            },
            'MoveTo': {
                joints: ['Astronaut', 'root'],
                attributes: ['rotation', 'position'],
                frames: [
                    [{x: '+0'}],
                    [{y: '+0'}]
                ],
                periods: [1500],
                delay: [0],
                repeat: false,
                reset: false
            },
            'CamTransition': {
                joints: ['PlayerCam', 'PlayerCam'],
                attributes: ['rotation', 'position'],
                frames:[
                    [{x: -180*c}],
                    [{y: 0.56, z: -5}]
                ],
                periods: [1300],
                delay: [0],
                repeat: false,
                reset: false
            },
            'Crunch': {
                joints: ['upTronco', 'rightShoulder', 'leftShoulder', 'rightElbow', 'leftElbow', 'rightHip', 'leftHip', 'rightKnee', 'leftKnee'],
                attributes: ['rotation','rotation','rotation','rotation','rotation','rotation','rotation','rotation','rotation'],
                frames: [
                    [{x: 20*c}],
                    [{x: -45*c}],
                    [{x: -45*c}],
                    [{x: -90*c}],
                    [{x: -90*c}],
                    [{x: -90*c}],
                    [{x: -90*c}],
                    [{x: 120*c}],
                    [{x: 120*c}],
                ],
                periods: [800],
                delay: false,
                repeat: false,
                reset: false
            },
        }
    },
    'SpaceShip': {
        animations: {
            'Boarding': {
                joints: ['root', 'leg1', 'leg2', 'leg3','leg4'],
                attributes: ['position', 'position', 'position', 'position', 'position'],
                frames: [
                    [{y: '+2'}],
                    [{x:  0.3, y: 0.8, z:  0.3}],
                    [{x: -0.3, y: 0.8, z: -0.3}],
                    [{x:  0.3, y: 0.8, z: -0.3}], 
                    [{x: -0.3, y: 0.8, z:  0.3}], 
                ],
                periods: [500],
                delay: false,
                repeat: false,
                reset: false,
            },

            'MoveTo': {
                joints: ['SpaceShip', 'root'],
                attributes: ['rotation', 'position'], 
                frames: [
                    [{x: '+0', y: '+0', z: '+0'}], 
                    [{y: '+0'}]
                ],
                periods: [0],
                delay: [0],
                repeat: false,
                reset: false,
            },

            'Doors': {
                joints: ['Door1', 'Door2'],
                attributes: ['rotation', 'rotation'],
                frames: [
                    [{z: 90*c}, {z: 0}],
                    [{z: -90*c}, {z: 0}]
                ],
                periods: [500, 500],
                delay: [250, 1500],
                repeat: false,
                reset: false,
            }

            // 'MoveTo': {
            //     joints: ['SpaceShip'],
            //     attributes: ['position'], 
            //     frames: [[{x: 0, y: 12.45, z: 0}]],
            //     periods: [1000],
            //     dealy: [300],
            //     repeat: false,
            //     reset: false,
            // }
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