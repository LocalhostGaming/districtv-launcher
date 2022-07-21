#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
    use window_shadows::set_shadow;

    tauri::Builder::default()
        .setup(|app| {
            Ok({
                let main_window = app.get_window("main").unwrap();

                set_shadow(&main_window, false).expect("Unsupported platform!");
            })
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
