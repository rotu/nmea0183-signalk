/*
* RPM codec
*
* @repository https://github.com/signalk/nmea-signalk
* @author Joachim Bakke, joabakk
*
*
* Copyright 2016, Joachim Bakke
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

"use strict";

/*
#        0 1 2   3   4 5
#        | | |   |   | |
# $--RPM,a,x,x.x,x.x,A*hh<CR><LF> Field Number:
#  0) Source, S = Shaft, E = Engine 1) Engine or shaft number 2) Speed,
#  Revolutions per minute 3) Propeller pitch, % of maximum, "-" means
#  astern 4) Status, A means data is valid 5) Checksum
*/

var Codec = require('../lib/NMEA0183');
module.exports = new Codec('RPM', function(multiplexer, input) {
  var values = input.values;

	multiplexer.self();

  multiplexer.add({
    "updates": [{
      "source": this.source(input.instrument),
      "timestamp": this.timestamp(),
      "values": [{
        "path": "propulsion.engine1.rpm",
        "value": this.float(values[2])
      },
      {
        "path": "propulsion.engine1.state",
        "value": "started"
      }]
    }],
    "context": multiplexer._context
  });
	return true;
});
