#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, SystemTray, SystemTrayEvent};
use window_shadows::set_shadow;

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                let main_window = app.get_window("main").unwrap();

                if main_window.is_visible().unwrap() {
                    main_window.unminimize().unwrap();
                    main_window.set_focus().unwrap();
                } else {
                    main_window.set_focus().unwrap();
                    main_window.show().unwrap();
                }
            }
            _ => {}
        })
        .setup(|app| {
            Ok({
                let main_window = app.get_window("main").unwrap();

                set_shadow(&main_window, false).expect("Unsupported platform!");
            })
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
