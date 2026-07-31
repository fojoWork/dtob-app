// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/


#[tauri::command]
fn dtob_conversion(input: &str) -> String {
    let _input = input.trim();

    if _input.is_empty() {
        return "Please enter a decimal number".to_string();
    }

    match _input.parse::<u8>() {
        Ok(target) => {
            let byte_sizes: [u8; 8] = [128, 64, 32, 16, 8, 4, 2, 1];
            let mut stored_binary: [u8; 8] = [0; 8];
            let mut cur_tot: u8 = 0;

            for _i in 0..8 {
                if cur_tot + byte_sizes[_i] <= target {
                    stored_binary[_i] = 1;
                    cur_tot += byte_sizes[_i];
                }
            }

            stored_binary
                .iter()
                .map(|&b| if b == 0 { '0' } else { '1' })
                .collect::<String>()
        }
        Err(_) => "Please enter a valid decimal number".to_string(),
    }
}

#[tauri::command]
fn btod_conversion(input: &str) -> String {
    let clean_input = input.trim().trim_start_matches("0b");

    if clean_input.is_empty() {
        return "Please enter a binary number".to_string();
    }

    match u32::from_str_radix(clean_input, 2) {
        Ok(decimal) => decimal.to_string(),
        Err(_) => "Please enter a valid binary number (0s and 1s only)".to_string(),
    }
}

#[tauri::command]
fn dtoa_conversion(input: &str) -> String {
    //need to take a binary value and convert it to decimal and then have it turn into ASCII letter.
    match input.trim().parse::<u8>() {
        Ok(num) => (num as char).to_string(),
        Err(num) => "Please enter a valid decimal number that is within 0..255".to_string(),
    } 


}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![dtob_conversion, btod_conversion, dtoa_conversion])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
