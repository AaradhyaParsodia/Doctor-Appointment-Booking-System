import data from "./data.js";
/**
 * Doctor Appointment Booking System - Advanced Assessment (JavaScript Version)
 *
 * Instructions:
 * 1. Implement the three functions below: bookAppointment, isAppointmentAvailable, and findAvailableDoctor.
 * 2. Use the provided data structure 'data' for storing and retrieving doctor information.
 * 3. Each appointment is exactly 30 minutes long.
 * 4. Appointment times are always at the start of the hour or half-hour (e.g., 14:00 or 14:30).
 * 5. The system should prevent booking overlapping appointments.
 * 6. Use the exact string formats specified in the function comments for all output messages.
 * 7. Ensure your implementation passes all the provided test cases.
 *
 * Data Structure:
 * The 'data' array contains objects representing doctors. Each doctor object has two properties:
 *   - name: A string representing the doctor's name.
 *   - appointments: An array of strings representing booked appointment times in "YYYY-MM-DD HH:MM" format.
 */

/**
 * Book an appointment for a patient with a specific doctor or any available doctor.
 * @param {string} patientName - The name of the patient.
 * @param {string|null} doctorName - The name of the doctor, or null to find any available doctor.
 * @param {string} appointmentTime - The proposed appointment time in "YYYY-MM-DD HH:MM" format.
 * @returns {string} A message indicating the result of the booking attempt.
 *
 * Output formats:
 * - Success: "Appointment booked for {patientName} with {doctorName} at {appointmentTime}."
 * - Unavailable: "Appointment with {doctorName} at {appointmentTime} is not available."
 * - No doctors available: "No available doctors for the appointment at {appointmentTime}."
 * - Doctor not found: "Doctor {doctorName} not found."
 */
function bookAppointment(patientName, doctorName, appointmentTime) {
    // Your implementation here
    // console.log(patientName, doctorName, appointmentTime);
    let result = "";

    // result = data.map(element => {
    //     if(doctorName === element.name ){
    //         element.appointments.map((e)=>{
    //             // console.log(e)
    //             if(e === appointmentTime){
    //                 console.log("dn")
    //                 return `Appointment with ${doctorName} at ${appointmentTime} is not available.`
    //             }
    //             else{
    //                 // console.log(dn)
    //                 return `Appointment booked for ${patientName} with ${doctorName} at ${appointmentTime}.`;
    //             }
    //         });
    //     }
    //     else if( doctorName != element.name){
    //         // console.log(dn)
    //         return `Doctor ${doctorName} not found.`;
    //     }
    // });



    // data.map((element)=>{
    //     if(){

    //     }
    //     if(element.appointments.includes(appointmentTime)){
    //         result = `No available doctors for the appointment at ${appointmentTime}.`;
    //     }
    // })

    let isDoctorName = false;

    if(doctorName !== null){

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            // console.log(element)
            
            
            if (doctorName === element.name) {
                
                // console.log(element.appointments.includes(appointmentTime));
    
                if(!isAppointmentAvailable(element, appointmentTime)){
                    return `Appointment with ${doctorName} at ${appointmentTime} is not available.`;
                }
                else{
                    // console.log("ddd");
                    element.appointments.push(appointmentTime);
                    return `Appointment booked for ${patientName} with ${doctorName} at ${appointmentTime}.`;
                }
    
    
                // const aa  = element.appointments.forEach((e) => {
                //     console.log(e)
                //     if (e === appointmentTime) {
                //         // console.log("dn")
    
                //         return `Appointment with ${doctorName} at ${appointmentTime} is not available.`
                //     }
                //     else {
                //         console.log("dn")
                //         return `Appointment booked for ${patientName} with ${doctorName} at ${appointmentTime}.`;
    
                //     }
                // });
            }
            // else if (doctorName != element.name) {
            //     // console.log(dn)
            //     return `Doctor ${doctorName} not found.`;
            // }
        }
    
        if(!isDoctorName){
            // console.log(dn)
            return `Doctor ${doctorName} not found.`;
        }
    }
    // console.log("Contron in here");
    
    // for (let i = 0; i < data.length; i++) {
    //     const element = data[i];
    //     // console.log(element)
    //     if (doctorName != element.name) {
    //         // console.log(dn)
    //         result = `Doctor ${doctorName} not found.`;
    //         break;
    //     }
    // }

    // for (let i = 0; i < data.length; i++) {
    //     const element = data[i];
        
    //     // console.log(element.appointments.includes(appointmentTime));
    //     if (isAppointmentAvailable(element, appointmentTime)) {
    //         result = `Appointment booked for ${patientName} with ${element.name} at ${appointmentTime}.`;
    //         break;
    //     }
    // }

    // for (let i = 0; i < data.length; i++) {
    //     const element = data[i];

    //     // console.log(element.appointments.includes(appointmentTime));
    //     if (element.appointments.includes(appointmentTime)) {
    //         result = `No available doctors for the appointment at ${appointmentTime}.`;
    //         break;
    //     }
    // }

    const isAnyDoctorAvailable = findAvailableDoctor(appointmentTime);
    if(isAnyDoctorAvailable){
        isAnyDoctorAvailable.appointments.push(appointmentTime);
        result = `Appointment booked for ${patientName} with ${isAnyDoctorAvailable.name} at ${appointmentTime}.`;
    }
    else {
        result = `No available doctors for the appointment at ${appointmentTime}.`;
    }

    return result;
}

/**
 * Check if the appointment time is available for the given doctor.
 * @param {Object} doctor - An object containing doctor information and appointments.
 * @param {string} appointmentTime - The proposed appointment time in "YYYY-MM-DD HH:MM" format.
 * @returns {boolean} True if the appointment time is available, false otherwise.
 */
function isAppointmentAvailable(doctor, appointmentTime) {
    // Your implementation here
    // console.log(doctor.appointments);
    // console.log(appointmentTime);

    const doctorAppointments = doctor.appointments;
    const appointmentTimeDATE = new Date(appointmentTime);
    const endAppointmentTimeDATE = new Date(appointmentTimeDATE.getTime() + 30 * 60 * 1000);

    // console.log(endAppointmentTimeDATE);

    for(let i=0;i<doctorAppointments.length;i++){
        
        const appointment = new Date(doctorAppointments[i]);
        const appointmentEnd = new Date(appointment.getTime() + 30 * 60 * 1000);

        if((appointmentTimeDATE >= appointment && appointmentTimeDATE < appointmentEnd) 
            || (endAppointmentTimeDATE > appointment && endAppointmentTimeDATE <= appointmentEnd)
            || (appointmentTimeDATE <= appointment && endAppointmentTimeDATE > appointmentEnd)){
                return false;
            }
    }

    return true;
}

/**
* Find an available doctor for the given appointment time.
* @param {string} appointmentTime - The proposed appointment time in "YYYY-MM-DD HH:MM" format.
* @returns {Object|null} An object containing the available doctor's information, or null if no doctor is available.
*/
function findAvailableDoctor(appointmentTime) {
    // Your implementation here

    for(let i=0;i<data.length;i++){
        const doctorDetailSlot = data[i];

        if(isAppointmentAvailable(doctorDetailSlot, appointmentTime)){
            return doctorDetailSlot;
        }

    }

    return null;
}



function runTests() {
    console.log("Running test cases...");


    // Test case 1: Book an appointment with a specific doctor
    let result = bookAppointment("John Doe", "Dr. Smith", "2024-08-27 11:00");
    console.assert(
        result ===
        "Appointment booked for John Doe with Dr. Smith at 2024-08-27 11:00.",
        `Test case 1 failed: ${result}`,
    );


    // Test case 2: Try to book an unavailable appointment (exact time conflict)
    result = bookAppointment("Jane Smith", "Dr. Smith", "2024-08-25 14:00");
    console.assert(
        result ===
        "Appointment with Dr. Smith at 2024-08-25 14:00 is not available.",
        `Test case 2 failed: ${result}`,
    );


    // Test case 3: Try to book an unavailable appointment (overlap conflict)
    result = bookAppointment("Alice Johnson", "Dr. Smith", "2024-08-25 14:15");
    console.assert(
        result ===
        "Appointment with Dr. Smith at 2024-08-25 14:15 is not available.",
        `Test case 3 failed: ${result}`,
    );


    // Test case 4: Book with any available doctor
    result = bookAppointment("Bob Wilson", null, "2024-08-27 09:00");
    console.assert(
        result.includes("Appointment booked for Bob Wilson with") &&
        result.includes("at 2024-08-27 09:00."),
        `Test case 4 failed: ${result}`,
    );


    // Test case 5: Try to book when no doctors are available
    data.forEach((doctor) => doctor.appointments.push("2024-08-28 10:00"));
    result = bookAppointment("Charlie Brown", null, "2024-08-28 10:15");
    console.assert(
        result === "No available doctors for the appointment at 2024-08-28 10:15.",
        `Test case 5 failed: ${result}`,
    );


    // Test case 6: Book with a non-existent doctor
    result = bookAppointment("David Lee", "Dr. Xavier", "2024-08-29 15:00");
    console.assert(
        result === "Doctor Dr. Xavier not found.",
        `Test case 6 failed: ${result}`,
    );


    // Test case 7: Complex conflict check (multiple existing appointments)
    result = bookAppointment("Eva Green", "Dr. Williams", "2024-08-25 13:30");
    console.assert(
        result ===
        "Appointment with Dr. Williams at 2024-08-25 13:30 is not available.",
        `Test case 7 failed: ${result}`,
    );


    // Test case 8: Booking just after an existing appointment (should be allowed)
    result = bookAppointment("Frank White", "Dr. Johnson", "2024-08-25 09:30");
    console.assert(
        result ===
        "Appointment booked for Frank White with Dr. Johnson at 2024-08-25 09:30.",
        `Test case 8 failed: ${result}`,
    );


    // // Test case 9: Booking overlapping with an existing appointment
    result = bookAppointment("Grace Taylor", "Dr. Johnson", "2024-08-25 08:45");
    console.assert(
        result ===
        "Appointment with Dr. Johnson at 2024-08-25 08:45 is not available.",
        `Test case 9 failed: ${result}`,
    );


    // Test case 10: Test isAppointmentAvailable function directly
    const doctor = data.find((d) => d.name === "Dr. Smith");
    console.assert(
        isAppointmentAvailable(doctor, "2024-08-27 12:00"),
        "Test case 10 failed: Appointment should be available",
    );
    console.assert(
        !isAppointmentAvailable(doctor, "2024-08-25 14:00"),
        "Test case 10 failed: Appointment should not be available",
    );


    // Test case 11: Test findAvailableDoctor function
    const availableDoctor = findAvailableDoctor("2024-08-27 13:00");
    console.assert(
        availableDoctor !== null,
        "Test case 11 failed: Should find an available doctor",
    );
    console.assert(
        data.some((d) => d.name === availableDoctor.name),
        `Test case 11 failed: Found invalid doctor ${availableDoctor.name}`,
    );


    // Test case 12: Book appointment at midnight
    result = bookAppointment("Midnight Patient", null, "2024-08-28 00:00");
    console.assert(
        result.includes("Appointment booked for Midnight Patient with") &&
        result.includes("at 2024-08-28 00:00."),
        `Test case 12 failed: ${result}`,
    );


    // Test case 13: Book appointment on a leap day
    result = bookAppointment("Leap Day Patient", null, "2024-02-29 10:00");
    console.assert(
        result.includes("Appointment booked for Leap Day Patient with") &&
        result.includes("at 2024-02-29 10:00."),
        `Test case 13 failed: ${result}`,
    );


    console.log("All test cases completed.");
}


// Run the tests
runTests();