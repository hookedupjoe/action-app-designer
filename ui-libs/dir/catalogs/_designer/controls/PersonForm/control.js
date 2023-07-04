/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {padding: true},
		"content": [
			{
				"ctl": "title",
				"size": "Large",
				"color": "blue",
				"name": "title",
				"text": "Person Form"
			},
			{
				"ctl": "message",
				"color": "blue",
				"size": "large",
				"name": "welcome",
				"hidden": true,
				"text": "Enter details below and save to submit a new person into the system"
			},
			{
				"ctl": "fieldrow",
				"items": [
					{
						"label": "First Name",
						"ctl": "field",
						"name": "firstname",
						"size": 7,
						"req": true
					},
					{
						"label": "Middle",
						"ctl": "field",
						"name": "middlename",
						"size": 2,
						"req": false
					},
					{
						"label": "Last Name",
						"ctl": "field",
						"name": "lastname",
						"size": 7,
						"req": true
					}
				]
			},
			{
				"ctl": "fieldrow",
				"items": [
					{
						"label": "Email",
						"ctl": "field",
						"name": "email",
						"req": true,
						"size": 7
					},
					{
						"label": "Phone",
						"ctl": "field",
						"name": "phone",
						"req": false,
						"size": 7
					},
					{
						"label": "Age",
						"ctl": "number",
						"name": "age",
						"req": false,
						"size": 2
					}
				]
			},
			{
				"ctl": "fieldrow",
				"name": "contact-appl-address",
				"items": [
					{
						"label": "Address",
						"ctl": "field",
						"name": "address",
						"size": 12,
						"req": true
					},
					{
						"label": "Suite / Apt",
						"ctl": "field",
						"name": "address2",
						"size": 6
					}
				]
			},
			{
				"label": "Country",
				"ctl": "dropdown",
				"name": "country",
				"list":"United States|US,Afghanistan|AF,Åland Islands|AX,Albania|AL,Algeria|DZ,American Samoa|AS,Andorra|AD,Angola|AO,Anguilla|AI,Antarctica|AQ,Antigua and Barbuda|AG,Argentina|AR,Armenia|AM,Aruba|AW,Australia|AU,Austria|AT,Azerbaijan|AZ,Bahamas|BS,Bahrain|BH,Bangladesh|BD,Barbados|BB,Belarus|BY,Belgium|BE,Belize|BZ,Benin|BJ,Bermuda|BM,Bhutan|BT,Bolivia, Plurinational State of|BO,Bonaire, Sint Eustatius and Saba|BQ,Bosnia and Herzegovina|BA,Botswana|BW,Bouvet Island|BV,Brazil|BR,British Indian Ocean Territory|IO,Brunei Darussalam|BN,Bulgaria|BG,Burkina Faso|BF,Burundi|BI,Cambodia|KH,Cameroon|CM,Canada|CA,Cape Verde|CV,Cayman Islands|KY,Central African Republic|CF,Chad|TD,Chile|CL,China|CN,Christmas Island|CX,Cocos (Keeling) Islands|CC,Colombia|CO,Comoros|KM,Congo|CG,Congo, the Democratic Republic of the|CD,Cook Islands|CK,Costa Rica|CR,Côte d'Ivoire|CI,Croatia|HR,Cuba|CU,Curaçao|CW,Cyprus|CY,Czech Republic|CZ,Denmark|DK,Djibouti|DJ,Dominica|DM,Dominican Republic|DO,Ecuador|EC,Egypt|EG,El Salvador|SV,Equatorial Guinea|GQ,Eritrea|ER,Estonia|EE,Ethiopia|ET,Falkland Islands (Malvinas|FK,Faroe Islands|FO,Fiji|FJ,Finland|FI,France|FR,French Guiana|GF,French Polynesia|PF,French Southern Territories|TF,Gabon|GA,Gambia|GM,Georgia|GE,Germany|DE,Ghana|GH,Gibraltar|GI,Greece|GR,Greenland|GL,Grenada|GD,Guadeloupe|GP,Guam|GU,Guatemala|GT,Guernsey|GG,Guinea|GN,Guinea-Bissau|GW,Guyana|GY,Haiti|HT,Heard Island and McDonald Islands|HM,Holy See (Vatican City State|VA,Honduras|HN,Hong Kong|HK,Hungary|HU,Iceland|IS,India|IN,Indonesia|ID,Iran, Islamic Republic of|IR,Iraq|IQ,Ireland|IE,Isle of Man|IM,Israel|IL,Italy|IT,Jamaica|JM,Japan|JP,Jersey|JE,Jordan|JO,Kazakhstan|KZ,Kenya|KE,Kiribati|KI,Korea, Democratic People's Republic of|KP,Korea, Republic of|KR,Kuwait|KW,Kyrgyzstan|KG,Lao People's Democratic Republic|LA,Latvia|LV,Lebanon|LB,Lesotho|LS,Liberia|LR,Libya|LY,Liechtenstein|LI,Lithuania|LT,Luxembourg|LU,Macao|MO,Macedonia, the former Yugoslav Republic of|MK,Madagascar|MG,Malawi|MW,Malaysia|MY,Maldives|MV,Mali|ML,Malta|MT,Marshall Islands|MH,Martinique|MQ,Mauritania|MR,Mauritius|MU,Mayotte|YT,Mexico|MX,Micronesia, Federated States of|FM,Moldova, Republic of|MD,Monaco|MC,Mongolia|MN,Montenegro|ME,Montserrat|MS,Morocco|MA,Mozambique|MZ,Myanmar|MM,Namibia|NA,Nauru|NR,Nepal|NP,Netherlands|NL,New Caledonia|NC,New Zealand|NZ,Nicaragua|NI,Niger|NE,Nigeria|NG,Niue|NU,Norfolk Island|NF,Northern Mariana Islands|MP,Norway|NO,Oman|OM,Pakistan|PK,Palau|PW,Palestinian Territory, Occupied|PS,Panama|PA,Papua New Guinea|PG,Paraguay|PY,Peru|PE,Philippines|PH,Pitcairn|PN,Poland|PL,Portugal|PT,Puerto Rico|PR,Qatar|QA,Réunion|RE,Romania|RO,Russian Federation|RU,Rwanda|RW,Saint Barthélemy|BL,Saint Helena, Ascension and Tristan da Cunha|SH,Saint Kitts and Nevis|KN,Saint Lucia|LC,Saint Martin (French part|MF,Saint Pierre and Miquelon|PM,Saint Vincent and the Grenadines|VC,Samoa|WS,San Marino|SM,Sao Tome and Principe|ST,Saudi Arabia|SA,Senegal|SN,Serbia|RS,Seychelles|SC,Sierra Leone|SL,Singapore|SG,Sint Maarten (Dutch part|SX,Slovakia|SK,Slovenia|SI,Solomon Islands|SB,Somalia|SO,South Africa|ZA,South Georgia and the South Sandwich Islands|GS,South Sudan|SS,Spain|ES,Sri Lanka|LK,Sudan|SD,Suriname|SR,Svalbard and Jan Mayen|SJ,Swaziland|SZ,Sweden|SE,Switzerland|CH,Syrian Arab Republic|SY,Taiwan, Province of China|TW,Tajikistan|TJ,Tanzania, United Republic of|TZ,Thailand|TH,Timor-Leste|TL,Togo|TG,Tokelau|TK,Tonga|TO,Trinidad and Tobago|TT,Tunisia|TN,Turkey|TR,Turkmenistan|TM,Turks and Caicos Islands|TC,Tuvalu|TV,Uganda|UG,Ukraine|UA,United Arab Emirates|AE,United Kingdom|GB,United States Minor Outlying Islands|UM,Uruguay|UY,Uzbekistan|UZ,Vanuatu|VU,Venezuela, Bolivarian Republic of|VE,Viet Nam|VN,Virgin Islands, British|VG,Virgin Islands, U.S|VI,Wallis and Futuna|WF,Western Sahara|EH,Yemen|YE,Zambia|ZM,Zimbabwe|ZW",
				"req": true,
				"default":"US",
				"onChange": {
					"run": "showfor",
					"values": {
						"": "state-text",
						"US": [
							"state"
						],
						"*": "state-text"
					}
				}
			},
			{
				"ctl": "fieldrow",
				"name": "contact-appl-addr-info",
				"items": [
					{
						"label": "City",
						"ctl": "field",
						"name": "city",
						"size": 7,
						"req": true
					},
					{
						"label": "State",
						"ctl": "dropdown",
						"list":"Alabama|AL,Alaska|AK,Arizona|AZ,Arkansas|AR,California|CA,Colorado|CO,Connecticut|CT,Delaware|DE,District Of Columbia|DC,Florida|FL,Georgia|GA,Hawaii|HI,Idaho|ID,Illinois|IL,Indiana|IN,Iowa|IA,Kansas|KS,Kentucky|KY,Louisiana|LA,Maine|ME,Maryland|MD,Massachusetts|MA,Michigan|MI,Minnesota|MN,Mississippi|MS,Missouri|MO,Montana|MT,Nebraska|NE,Nevada|NV,New Hampshire|NH,New Jersey|NJ,New Mexico|NM,New York|NY,North Carolina|NC,North Dakota|ND,Ohio|OH,Oklahoma|OK,Oregon|OR,Pennsylvania|PA,Rhode Island|RI,South Carolina|SC,South Dakota|SD,Tennessee|TN,Texas|TX,Utah|UT,Vermont|VT,Virginia|VA,Washington|WA,West Virginia|WV,Wisconsin|WI,Wyoming|WY",
						"name": "state",
						"size": 6,
						"req": true
					},
					{
						"label": "State Text",
						"ctl": "field",
						"name": "state-text",
						"size": 6,
						"req": false
					},
					{
						"label": "Zip Code",
						"ctl": "field",
						"name": "zipcode",
						"size": 5
					}
				]
			},
			{
				"ctl": "divider",
				"color": "blue",
				"size": "medium",
				"text": "Other Details"
			},
			{
				"ctl": "fieldrow",
				"label": "More Options",
				"name": "options-row",
				"items": [
					{
						"ctl": "radiolist",
						"name": "one",
						"label": "Select one option",
						"onChange": {
							"run": "showif",
							"field": "one-other",
							"value": "other"
						},
						"list": "This Option|this,That Option|that,The Other Option|other",
						"note": "Other option shows more stuff",
						"req": false
					},
					{
						"ctl": "checkboxlist",
						"name": "one-other",
						"label": "Select any of these",
						"list": "One,Two,Three,Four,Five",
						"req": true
					}
				]
			},
			{
				"ctl": "fieldrow",
				"name": "selections-row",
				"items": [
					{
						"ctl": "dropdown",
						"name": "track",
						"label": "Track",
						"list": "Business,Technical",
						"req": false
					},
					{
						"ctl": "dropdown",
						"multi": true,
						"name": "topic",
						"label": "Select Topic(s)",
						"list": "Work,Play,Meetup,Play More,Other",
						"req": false
					}
				]
			},			
			{
				"name": "comments",
				"label": "Comments",
				"placeholder": "Enter any comments related to this person",
				"ctl": "textarea",
				"rows": 5
			},
			{
				"name": "id",
				"ctl": "hidden"
			},
			{
				"name": "__doctype",
				"ctl": "hidden",
				"value": "person"
			},
			{
				"name": "__doctitle",
				"ctl": "hidden"
			},
			{
				"name": "tag",
				"ctl": "hidden"
			},
			{
				"ctl": "segment",
				"raised": true,
				"clearing": true,
				"name":'submit-bar',
				"hidden": false,
				"content":[
					{
						"ctl": "button",
						"color": "blue",
						"size": "large",
						"onClick": {
							"run": "action",
							"action": "submitForm",
							"validate": true
						},
						"labeled": true,
						"right": true,
						"toright": true,
						"icon": "arrow right",
						"name": "btn-submit",
						"text": "Submit Form"
					}
				]
			}
			
	
		]
		
	}


	var ControlCode = {
		setup: setup,
		submitForm: submitForm,
		_onInit: _onInit
	};

	function setup() {
		// var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
		// var tmpURL = tmpBaseURL + '/wp-json/actappdesigner/json_from_csv?run&pos=auto';
		// var tmpThis = this;
		// ThisApp.apiCall(tmpURL).then(function(theReply){
		// 	console.log('tmpThis',tmpThis)
		// 	if( theReply && theReply.data && theReply.data.length ){
		// 		console.log('theReply',theReply);
		// 		tmpThis.loadData(theReply.data[0]);
		// 	}
		// })
	}
	
	function _onInit(){
		var tmpThis = this;
		window.personForm = this;
		ThisApp.delay(1).then(function(){
			tmpThis.setup();
		})
	}
	
	function submitForm() {
	  //ToDo: Move this to server side in doctype definition?
		var tmpDocTitle = this.getFieldValue('firstname') + ' ' + this.getFieldValue('lastname');
		this.setFieldValue('__doctitle', tmpDocTitle);
		console.log('submitForm')

		var tmpData = this.getData();
		
		var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
		//console.log('tmpBaseURL',tmpBaseURL)
		var tmpPostOptions = {
			formSubmit: false,
			data: tmpData,
			url: tmpBaseURL + '/wp-json/actappdesigner/savedoc?open'
		}
		return ThisApp.apiCall(tmpPostOptions);
	}

	//=== End
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

