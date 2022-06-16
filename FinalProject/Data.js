const c = Math.PI/180;

export const Data = {
    'Astronaut': {
        animations: {
            'Reset': {
                joints: ['radius', 'root', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],

                frames: [
                    [{y: 10.56}],
                    [{y: 0}],
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

                periods: [250],
                repeat: false,
                delay: false,
            },
            'nWalk': {
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {radius: 10.47}, {radius: 10.51}, {radius: 10.55}, {radius: 10.57},       {radius: 10.47}, {radius: 10.51}, {radius: 10.55}, {radius: 10.57}],       // Height

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
                periods: new Array(8).fill(500),
                repeat: true,
                delay: false,
                reset: true,
            },
            'Walk': { // Walking Animation (with Gravity)
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {y: '+0.15'}, {y: '+0.15'}, {y: '-0.15'}, {y: '-0.15'},       {y: '+0.15'}, {y: '+0.15'}, {y: '-0.15'}, {y: '-0.15'}],       // Height

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
                periods: [200, 400, 400, 200, 200, 400, 400, 200],
                repeat: false,
                delay: false,
                reset: true,

            },

            'Jump': {
                joints: ['radius', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames: [
                    [{y: '-0.16'}, {y: '+0.16'}, {y: '+1'}, {y: '-1.16'}],
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
                periods: [200, 300, 400, 500],
                repeat: false,
                delay: [false, 50, false, 50],
                reset: true,

            },
            'TurnRight': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                frames: [[{y: '-0.0'}],[{x: '-0.5'}],[{x: '-0.5'}],[{y: '-0.25'}]],
                periods: [200],
                reset: false,
            },
            'TurnLeft': {
                joints: ['root','leftAnkle','rightAnkle', 'upTronco'],
                frames: [[{y: '+0.0'}],[{x: '+0.5'}],[{x: '+0.5'}],[{y: '+0.25'}]],
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
            // 'TurnBack': {
            //     joints: ['root'],
            //     frames: [[{y: "3.1415"}]],
            //     periods: [600],
            //     reset: true,
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