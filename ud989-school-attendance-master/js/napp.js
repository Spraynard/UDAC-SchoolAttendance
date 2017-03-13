var model = {
	//This will be a list of all of the students, their personal attendance record, and the number of days they have missed.
	amtDays : 12,

	students : [{
		name : "Slappy The Frog",
		record : [],
		hookyChance : 0.8,
	},
	{
		name : "Lilly The Lizard",
		record : [],
		hookyChance : 0.2,
	},
	{
		name : "Paulrus the Walrus",
		record : [],
		hookyChance : 0.1,
	},
	{
		name : "Gregory The Goat",
		record : [],
		hookyChance : 0.3,
	},
	{
		name : "Adam The Anaconda",
		record : [],
		hookyChance : 0.5,
	}],
};

var view = {
	init : function () {
		view.renderTableHead()
		view.renderStudentRows()
	},

	renderTableHead : function () {
		// poptableHead will populate the table headers for the current table.

		this.tableHead = $("#tableHead");
		var studentNameHeader = document.createElement('th');
		studentNameHeader.innerHTML = "Student Name";
		studentNameHeader.className = 'name-col';
		this.tableHead.append(studentNameHeader);

		for (var i = 0; i < octopus.getDays(); i++ ) {
			var headElem = document.createElement('th');
			var dayNumber = i+1;
			headElem.innerHTML = dayNumber;
			this.tableHead.append(headElem);
		}

		var missedColHeader = document.createElement('th');
		missedColHeader.innerHTML = "Days Missed Column";
		missedColHeader.className = 'missed-col';
		this.tableHead.append(missedColHeader);
	},

	renderStudentRows : function () {
		// studentRows will populate student rows in the view as well as the attendance checkboxes

		this.tableStudents = $("#tableStudents");
		students = octopus.getStudents();

		for (var i = 0; i < students.length; i++) {
			var studentHolder = '<tr class="student"></tr>'
			this.tableStudents.append(studentHolder);

			var currentStudentHolder = $('.student:last');
			var studentNameHolder = '<td class="name-col">' + students[i].name + '</td>'
			currentStudentHolder.append(studentNameHolder);

			for (var j = 0; j < octopus.getDays(); j++) {
				var attendColHolder = '<td class="attend-col ' + students[i].name + '"></td>'
				currentStudentHolder.append(attendColHolder)

				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';

				if (students[i].record[j]) {
					checkbox.checked = true;
				}

				$('.attend-col:last').append(checkbox);
			}

			var missedDaysHolder = '<td class="missed-col"></td>'
			currentStudentHolder.append(missedDaysHolder);
		}
		octopus.checkboxClickEventListener();
		view.renderMissedDays();
	},

	renderMissedDays : function () {
		// This reads all of the checkboxes and displays missed days off of them.

		missedScoreHolders = $('tbody .missed-col');

		$(missedScoreHolders).each(function () {
			var studentRow = $(this).parent('tr');
			var studentChecks = $(studentRow).children('td').children('input');
			var missedDays = 0;

			$(studentChecks).each(function() {
				if (!(this.checked)) {
					missedDays += 1;
				}
			});

			$(this).text(missedDays);
		})
	}
};

var octopus = {
	init : function () {
		octopus.newAttendanceRecords();
		view.init();
	},

	newAttendanceRecords : function () {
		//This function will set random attendance records for each of the students, and store it in the model.
		var students = octopus.getStudents();

		for (var i = 0; i < students.length; i++) {
			if (!(students[i].record.length === 0)) {
				students[i].record = [];
			};

			for (var j = 0; j < model.amtDays; j++) {
				var attended = octopus.attendDayBool(students[i].hookyChance);

				students[i].record.push(attended);
			}
		}
	},

	checkboxClickEventListener : function () {
		var inputs = $('input');
		$(inputs).click(function () {
			view.renderMissedDays();
		})
	},

	getDays : function () {
		return model.amtDays;
	},

	attendDayBool : function (chance) {
		//This function will give a true or false, which tells whether or not a student attended. Based off a random roll.
		return (Math.random() >= chance)
	},

	getStudents : function () {
		return model.students;
	}
};
octopus.init()